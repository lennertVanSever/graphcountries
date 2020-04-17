import fetch from 'node-fetch';
import { driver, session } from '../neo4j/index.js';
import { asyncForEach } from '../utils/async';


const resetDatabase = async () => {
  await session.run(`
    match (a) -[r] -> () delete a, r
  `);
  await session.run (`
    match (a) delete a
  `)
}

const getAllApiCountries = async (callback) => {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await response.json();
  await asyncForEach(data, async (country) => {
    await callback(country);
  });
}

const setCountry = async (country) => {
  const insertedCountry = await session.run(
    `
    CREATE (country:Country {
      name: $name,
      alpha2Code: $alpha2Code,
      alpha3Code: $alpha3Code,
      population: $population,
      demonym: $demonym,
      area: $area,
      gini: $gini,
      nativeName: $nativeName,
      numericCode: $numericCode,
      cioc: $cioc,
      latitude: $latitude,
      longitude: $longitude
    })
    return ID(country)
    `, {
      ...country,
      latitude: country.latlng[0] || 0,
      longitude: country.latlng[1] || 0,
    }
  );
  // console.log('inserted country', country.name);
  await createSimpleNodesAndLinkToIt('TopLevelDomain', 'hasTopLevelDomain', country.topLevelDomain, country.name);
  await createSimpleNodesAndLinkToIt('CallingCode', 'hasCallingCode', country.callingCodes, country.name);
  await createSimpleNodesAndLinkToIt('AlternativeSpelling', 'hasAlternativeSpelling', country.altSpellings, country.name);
  await createSimpleNodesAndLinkToIt('Timezone', 'hasTimezone', country.timezones, country.name);
  await createBorderRelationShip(country);
  await createRegions(country);
  await createComplexNodesAndLinkToIt('Language', 'hasOfficialLanguage', country.languages, country.name)
  await createComplexNodesAndLinkToIt('Currency', 'hasCurrency', country.currencies, country.name)
  await createComplexNodesAndLinkToIt('Currency', 'hasCurrency', country.currencies, country.name)
  await createComplexNodesAndLinkToIt('RegionalBloc', 'hasRegionalBlocs', country.regionalBlocs, country.name)
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
    console.log(`inserted ${newNodeType}`, newNodeData);
  });
}

// const getIDProperty = (node) => {
//   const firstKey = node.records[0].keys[0];
//   return node.records[0].get(firstKey); 
// }
 
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
  if (region && subregion) {
    try {
      await session.run(
        `
        MATCH(country: Country { name: $name })
        MERGE(subregion: Subregion { name: $subregion })
        MERGE(region: Region { name: $region })
        MERGE(country)-[:hasSubregion]->(subregion)
        MERGE(subregion)-[:hasRegion]->(region)
        `, {
          name, region, subregion
        }
      )
      console.log(name, region, subregion);
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
(async () => {
  await resetDatabase();
  await makeUnits();
  await getAllApiCountries(setCountry);
  driver.close()
})();