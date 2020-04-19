# Graph countries
Use GraphQL to query country related data, free of charge and without restrictions. The data is the same as [restcountries.eu](https://restcountries.eu/) with extra emoji's for [flags](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%20%20Flag%20%7B%0A%20%20%20%20emoji%0A%20%20%20%20country%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A) because who doesn't like emoji's?


### [Explore the playground](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%09Country%20%7B%0A%20%20%20%20name%0A%20%20%20%20%23%20check%20the%20docs%20for%20more%20info%0A%20%20%7D%0A%7D%0A)


Some example queries: 

* [Countries](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%20%20Country%20%7B%0A%20%20%20%20name%0A%20%20%20%20nativeName%0A%20%20%20%20alpha2Code%0A%20%20%20%20alpha3Code%0A%20%20%20%20area%0A%20%20%20%20population%0A%20%20%20%20populationDensity%0A%20%20%20%20cAPItal%0A%20%20%20%20demonym%0A%20%20%20%20gini%0A%20%20%20%20location%20%7B%0A%20%20%20%20%20%20latitude%0A%20%20%20%20%20%20longitude%0A%20%20%20%20%7D%0A%20%20%20%20numericCode%0A%20%20%20%20subregion%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20region%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20officialLanguages%20%7B%0A%20%20%20%20%20%20iso639_1%0A%20%20%20%20%20%20iso639_2%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20nativeName%0A%20%20%20%20%7D%0A%20%20%20%20currencies%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20symbol%0A%20%20%20%20%7D%0A%20%20%20%20regionalBlocs%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20acronym%0A%20%20%20%20%20%20otherAcronyms%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20otherNames%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20flag%20%7B%0A%20%20%20%20%20%20emoji%0A%20%20%20%20%20%20emojiUnicode%0A%20%20%20%20%20%20svgFile%0A%20%20%20%20%7D%0A%20%20%20%20topLevelDomains%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20callingCodes%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20alternativeSpellings%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Timezones](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%20%20Timezone%28orderBy%3A%20name_asc%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20countries%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Currencies](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%20%20Currency%20%7B%0A%20%20%20%20name%0A%20%20%20%20code%0A%20%20%20%20symbol%0A%20%20%20%20countries%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Languages](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%09Language%20%7B%0A%20%20%20%20iso639_1%0A%20%20%20%20iso639_2%0A%20%20%20%20name%0A%20%20%20%20nativeName%0A%20%20%20%20countries%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Regions + subregions](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%09Region%20%7B%0A%20%20%20%20subregions%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20countries%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Top level domains](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%09TopLevelDomain%20%7B%0A%20%20%20%20name%0A%20%20%20%20countries%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Calling codes](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%09CallingCode%20%7B%0A%20%20%20%20name%0A%20%20%20%20countries%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Flags](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%20%20Flag%20%7B%0A%20%20%20%20emoji%0A%20%20%20%20svgFile%0A%20%20%20%20emojiUnicode%0A%20%20%20%20country%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Bordering countries](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%09Country%20%7B%0A%20%20%20%20name%0A%20%20%20%20borders%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Translations](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%09Country%20%7B%0A%20%20%20%20name%0A%20%20%20%20nameTranslations%28filter%3A%20%7B%20languageCode_in%3A%20%5B%22fr%22%2C%20%22nl%22%5D%7D%29%20%7B%0A%20%20%20%20%20%20value%0A%20%20%20%20%20%20languageCode%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Shortest path to another country](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%09Country%20%7B%0A%20%20%20%20name%0A%20%20%20%20shortestPathToOtherCountry%28otherCountryAlpha2Code%3A%20%22RU%22%29%20%7B%0A%09%09%09name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [Distance to other countries](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%09Country%20%7B%0A%20%20%20%20name%0A%20%20%20%20distanceToOtherCountries%28first%3A%205%29%20%7B%0A%20%20%20%20%20%20distanceInKm%0A%20%20%20%20%20%20countryName%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
* [A combination of everything](https://countries-274616.ew.r.appspot.com/?query=query%20%7B%0A%09Country%28alpha2Code%3A%20%22BE%22%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20nativeName%0A%20%20%20%20alpha2Code%0A%20%20%20%20alpha3Code%0A%20%20%20%20area%0A%20%20%20%20population%0A%20%20%20%20populationDensity%0A%20%20%20%20convertedArea%28areaUnit%3A%20SQUARE_MILES%29%20%7B%0A%20%20%20%20%20%20value%0A%20%20%20%20%20%20unit%0A%20%20%20%20%20%20populationDensity%0A%20%20%20%20%7D%0A%20%20%20%20cAPItal%0A%20%20%20%20demonym%0A%20%20%20%20gini%0A%20%20%20%20location%20%7B%0A%20%20%20%20%20%20latitude%0A%20%20%20%20%20%20longitude%0A%20%20%20%20%7D%0A%20%20%20%20numericCode%0A%20%20%20%20subregion%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20region%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20officialLanguages%20%7B%0A%20%20%20%20%20%20iso639_1%0A%20%20%20%20%20%20iso639_2%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20nativeName%0A%20%20%20%20%7D%0A%20%20%20%20currencies%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20symbol%0A%20%20%20%20%7D%0A%20%20%20%20regionalBlocs%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20acronym%0A%20%20%20%20%20%20otherAcronyms%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20otherNames%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20flag%20%7B%0A%20%20%20%20%20%20emoji%0A%20%20%20%20%20%20emojiUnicode%0A%20%20%20%20%20%20svgFile%0A%20%20%20%20%7D%0A%20%20%20%20borders%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20distanceToOtherCountries%28first%3A%205%29%20%7B%0A%20%20%20%20%20%20distanceInKm%0A%20%20%20%20%20%20countryName%0A%20%20%20%20%7D%0A%20%20%20%20shortestPathToOtherCountry%28otherCountryAlpha2Code%3A%20%22MN%22%29%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20topLevelDomains%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20callingCodes%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20alternativeSpellings%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20timezones%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20nameTranslations%20%7B%0A%20%20%20%20%20%20languageCode%0A%20%20%20%20%20%20value%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)

You can also select, paginate, filter, search and order any entity, the options are endless.

Once you have your desired query you can fetch the data like any other GraphQL endpoint but you probably want to use something like [appolo client](https://www.apollographql.com/docs/).

```javascript
fetch('https://countries-274616.ew.r.appspot.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: `
    query {
      CallingCode {
        name
        countries {
          name
        }
      }
    }

` }),
})
  .then(res => res.json())
  .then(res => console.log(res.data));
```

## How it works

The data from [restcountries.eu](https://restcountries.eu/) is scraped with a JS script and inserted into a Neo4j graph database. Afterwards the GraphQL schema is automagically infered by the awesome [neo4j-graphql-js](https://github.com/neo4j-graphql/neo4j-graphql-js) package. We add some custom cypher queries to the schema to make the shortest path and distance data possible. Finally an Apollo server is used to create the GraphQL endpoint and playground.

## Self hosting

It's quite straightforward to host the API yourself, unfortunately I can't share a read only user to the Neo4j database since I don't have a Neo4j enterprise license so you will need your own Neo4j graph database

Prerequisites:

* [NodeJS and npm installed](https://nodejs.org/en/download/)
* [A local or cloud Neo4j graph database](https://neo4j.com/download/)
* [APOC plugin installed on Neo4j](https://neo4j.com/developer/neo4j-apoc/)

Getting started:

1. Clone this repo and navigate to it
2. Create an .env file on the project root folder with your Neo4j credentials and an optional apollo engine API key

	```
	ENGINE_API_KEY=REPLACE_ME_WITH_YOUR_APOLLO_ENGINE_API_KEY
	BOLT_ADDRESS=REPLACE_ME_WITH_YOUR_NEO4J_BOLT_ADDRESS
	DB_USERNAME=REPLACE_ME_WITH_YOUR_NEO4J_USERNAME
	DB_PASSWORD=REPLACE_ME_WITH_YOUR_NEO4J_PASSWORD
	``` 
3. Download the dependencies, run `npm install`
4. Populate the Neo4j graph database, run `npm run dataScrAPIng`. When this command is done, you will get an infered schema file in the graphql repo, you can use this to optionally change the main schema.graphql file in the same repo
5. Start the GraphQL in dev mode, run `npm run dev`
6. Visit [http://localhost:8080/](http://localhost:8080/) to discover your self hosted API, have fun!