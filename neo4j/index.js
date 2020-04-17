import neo4j from 'neo4j-driver';
export const driver = neo4j.driver('bolt://localhost:11003', neo4j.auth.basic('neo4j', 'countries'));
export const session = driver.session();