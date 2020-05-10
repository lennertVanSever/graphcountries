import { inferSchema } from 'neo4j-graphql-js';
import { driver } from '../neo4j/index.js';
import fs from 'fs';

export const inferNeo4jSchema = async () => {
  const { typeDefs } = await inferSchema(driver, { alwaysIncludeRelationships: false });
  fs.writeFileSync('./src/graphql/schemaInfered.graphql', typeDefs);
  console.log('file written')
}

// inferNeo4jSchema();