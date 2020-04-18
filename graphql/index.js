require('dotenv').config()
import { makeAugmentedSchema, inferSchema } from 'neo4j-graphql-js';
import { ApolloServer } from 'apollo-server';
import { driver } from '../neo4j/index.js';
import fs from 'fs';


fs.readFile('./graphql/schema.graphql', (error, result) => {
  if (error) {
    console.error(error);
  } else {
    const typeDefs = result.toString();
    const generatedSchema = makeAugmentedSchema({
      typeDefs,
      config: {
        query: {
          exclude: ["AlternativeSpelling", "Area", "OtherAcronym", "OtherName", "Translation", "DistanceToOtherCountry"]
        },
        mutation: false
      }
    });
    
    const server = new ApolloServer({
      schema: generatedSchema,
      context: ({ req }) => {
        return {
          driver,
          req
        };
      },
      engine: {
        apiKey: "service:graphql-countries:MHaMUmJGfYSddSP_IU5Iqg",
      }
    });
    const port = process.env.GRAPHQL_LISTEN_PORT || 8080;
    
    server.listen(port, '0.0.0.0').then(({ url }) => {
      console.log(`GraphQL API ready at ${url}`);
    }).catch(err => console.error(err));
  }
})