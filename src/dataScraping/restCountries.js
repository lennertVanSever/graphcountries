import fetch from 'node-fetch';
import { driver, session } from '../neo4j/index.js';
import { asyncForEach } from '../utils/async';
import { inferNeo4jSchema } from '../graphql/getInferedSchema';
import emojiFlags from './emojiFlags.json';

const resetDatabase = async () => {
  await session.run(`
    match (a) -[r] -> () delete a, r
  `);
  await session.run (`
    match (a) delete a
  `)
}

const getData = async (callback) => {

  const responseCountries = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await responseCountries.json();
  
  await asyncForEach(countries, async (country) => {
    await callback(country, { svgFile: country.flag, ...emojiFlags[country.alpha2Code] });
  });
}

const setCountry = async (country, flag) => {
  await session.run(
    `
    CREATE (country:Country {
      name: $name,
      alpha2Code: $alpha2Code,
      alpha3Code: $alpha3Code,
      population: $population,
      demonym: $demonym,
      capital: $capital,
      area: $area,
      gini: $gini,
      nativeName: $nativeName,
      numericCode: $numericCode,
      location: Point({latitude: $latitude, longitude: $longitude})
    })
    return ID(country)
    `, {
      ...country,
      latitude: country.latlng[0] || 0,
      longitude: country.latlng[1] || 0,
    }
  );
  console.log(country.name);
  await createSimpleNodesAndLinkToIt('TopLevelDomain', 'hasTopLevelDomain', country.topLevelDomain, country.name);
  await createSimpleNodesAndLinkToIt('CallingCode', 'hasCallingCode', country.callingCodes, country.name);
  await createSimpleNodesAndLinkToIt('AlternativeSpelling', 'hasAlternativeSpelling', country.altSpellings, country.name);
  await createSimpleNodesAndLinkToIt('Timezone', 'hasTimezone', country.timezones, country.name);
  await createBorderRelationShip(country);
  await createRegions(country);
  await createTranslatedCountryNames(country);
  await createComplexNodesAndLinkToIt('Flag', 'hasFlag', [flag], country.name);
  await createComplexNodesAndLinkToIt('Language', 'hasOfficialLanguage', country.languages, country.name)
  await createComplexNodesAndLinkToIt('Currency', 'hasCurrency', country.currencies, country.name)
  await createComplexNodesAndLinkToIt('Currency', 'hasCurrency', country.currencies, country.name)
  await createRegionalBloc(country);
}

const createSimpleNodesAndLinkToIt = async (newNodeType, relationType, newNodeNames, countryName) => {
  await asyncForEach(newNodeNames, async (newNodeName) => {
    if (newNodeName) {
      const newNode = await session.run(
        `
        MATCH (country:Country { name: $countryName })
        MERGE (n:${newNodeType} { name: $newNodeName })
        MERGE (country)-[r:${relationType}]->(n)
        return ID(n)`,
        {
          newNodeName,
          countryName,
        }
      );
    }
    // console.log(`inserted ${newNodeType}`, newNodeName);
  });
}


const createComplexNodesAndLinkToIt = async (newNodeType, relationType, newNodesData, countryName) => {
  await asyncForEach(newNodesData, async (newNodeData) => {
    let inputNewNode = `{ `;
    Object.keys(newNodeData).forEach((key, index) => {
      const value = newNodeData[key];
      inputNewNode += `${key}: "${newNodeData[key]}"`;
      if (index < Object.keys(newNodeData).length - 1) inputNewNode += ', ';
    });
    inputNewNode += ' }';
    const newNode = await session.run(
      `
      MATCH (country:Country { name: $countryName })
      MERGE (n:${newNodeType} ${inputNewNode})
      MERGE (country)-[r:${relationType}]->(n)
      return ID(n)`,
      {
        countryName,
      }
    );
    // console.log(`inserted ${newNodeType}`, newNodeData);
  });
}

const createRegionalBloc = async (country) => {
  await asyncForEach(country.regionalBlocs, async (regionalBloc) => {
    await session.run(
      `
      MATCH (country:Country { name: $countryName })
      MERGE (regionalBloc:RegionalBloc { acronym: $acronym, name: $regionalBlocName })
      MERGE (country)-[r:hasRegionalBloc]->(regionalBloc)
      `,
      {
        countryName: country.name,
        regionalBlocName: regionalBloc.name,
        acronym: regionalBloc.acronym,
      }
    );
    await asyncForEach(regionalBloc.otherAcronyms, async otherAcronym => {
      await session.run(
        `
        MATCH (regionalBloc:RegionalBloc { name: $regionalBlocName })
        MERGE (otherAcronym:OtherAcronym { name: $otherAcronym })
        MERGE (regionalBloc)-[r:hasOtherAcronym]->(otherAcronym)
        `,
        {
          regionalBlocName: regionalBloc.name,
          otherAcronym
        }
      );
    });
    await asyncForEach(regionalBloc.otherNames, async otherName => {
      await session.run(
        `
        MATCH (regionalBloc:RegionalBloc { name: $regionalBlocName })
        MERGE (otherName:OtherName { name: $otherName })
        MERGE (regionalBloc)-[r:hasOtherName]->(otherName)
        `,
        {
          regionalBlocName: regionalBloc.name,
          otherName
        }
      );
    });
  });
}
 
const createBorderRelationShip = async ({ alpha3Code, borders }) => {
    await asyncForEach(borders, async (borderCode) => {
      try {
        await session.run(
          `
          MATCH(a: Country { alpha3Code: $code1 })
          MATCH(b: Country { alpha3Code: $code2 })
          MERGE(a)-[:borders]-(b)
          return a, b
          `, {
            code1: alpha3Code,
            code2: borderCode,
          }
        )
        // console.log('insert border', alpha3Code, borderCode);
      }
      catch(e) {
        console.log('insert border fail');
      }
    })
  }

const createRegions = async ({ name, region, subregion }) => {
  if (region) {
    try {
      await session.run(
        `
        MATCH(country: Country { name: $name })
        MERGE(subregion: Subregion { name: $subregion })
        MERGE(region: Region { name: $region })
        MERGE(country)-[:hasSubregion]->(subregion)
        // MERGE(country)-[:hasRegion]->(region)
        MERGE(subregion)-[:hasRegion]->(region)
        `, {
          name, region, subregion
        }
      )
    }
    catch(e) {
      console.log(e);
    }
  }
}

const makeUnits = async () => {
  await session.run(`
    CREATE(n1:Unit { name: 'SQUARE_METERS', value: 1000000, unit: 'm2' })
    CREATE(n2:Unit { name: 'SQUARE_KILOMETERS', value: 1, unit: 'km2' })
    CREATE(n3:Unit { name: 'SQUARE_MILES', value: 0.386102, unit: 'mi2' })
  `)
}

const createTranslatedCountryNames = async ({ translations, name }) => {
  await asyncForEach(Object.keys(translations), async languageCode => {
    const translationValue = translations[languageCode];
    if (translationValue) {
      await session.run(
        `
        MATCH(country: Country { name: $name })
        MERGE(translation: Translation { value: $translationValue, languageCode: $languageCode })
        MERGE(country)-[:hasLocale]->(translation)
        `, {
          name,
          languageCode,
          translationValue
        }
      )
    }
  });
}

(async () => {
  await resetDatabase();
  await makeUnits();
  await getData(setCountry);
  await inferNeo4jSchema();
  driver.close()
})();