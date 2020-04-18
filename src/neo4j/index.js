require('dotenv').config()
import neo4j from 'neo4j-driver';

const {
  BOLT_ADDRESS,
  DB_USERNAME,
  DB_PASSWORD
} = process.env;

export const driver = neo4j.driver(BOLT_ADDRESS, neo4j.auth.basic(DB_USERNAME, DB_PASSWORD));
export const session = driver.session();