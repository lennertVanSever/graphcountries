
CALL gds.graph.create(
    'language-graph',
    ['Country', 'Language'],
    'hasOfficialLanguage'
)
YIELD graphName, nodeCount, relationshipCount;

CALL gds.graph.create(
    'similar-graph',
    ['Country', 'Language', 'Currency', 'Subregion', 'Timezone', 'RegionalBloc'],
    ['borders', 'hasOfficialLanguage', 'hasSubregion', 'hasCurrency', 'hasTimezone', 'hasRegionalBloc']
)

// SIMPLE ALGO
// countries with most borders
MATCH (country:Country)
WITH country, SIZE(()-[:borders]-(country)) as borderCount
ORDER BY borderCount DESC
RETURN country.name, borderCount

// languages ordered by prevelance in countries
MATCH (country:Country)
MATCH (language:Language)
WITH country, language, SIZE(()-[:hasOfficialLanguage]-(language)) as countryCount
ORDER BY countryCount DESC
RETURN DISTINCT(language.name), countryCount



// PAGE RANK
// page rank only interesting in directed graph
CALL gds.pageRank.stream('language-graph', { dampingFactor: 0.99})
YIELD nodeId, score
WITH gds.util.asNode(nodeId) as n, score
WHERE EXISTS(n.iso639_1)
RETURN n.name, ROUND(100 * (score)) / 100 as score
ORDER BY score DESC



// Most similar bordering countries
CALL gds.nodeSimilarity.stream('similar-graph')
YIELD node1, node2, similarity
WITH gds.util.asNode(node1) as country1, gds.util.asNode(node2) as country2, similarity
WHERE (country1)-[:borders]-(country2)
RETURN country1.name, country2.name, similarity
ORDER BY similarity DESC

// Shortest path from Austria to North Korea
MATCH (from:Country {alpha2Code:'AT'}), (to:Country {alpha2Code:'KP'})
RETURN shortestPath((from)-[:borders*]-(to))

// get the graph diameter
MATCH (a:Country), (b:Country) WHERE id(a) > id(b)
MATCH p=shortestPath((a)-[:borders*]-(b))
WITH length(p) AS len, p
ORDER BY len DESC LIMIT 1
RETURN p



// BETWEENNES RANK
// centrality
CALL gds.alpha.betweenness.stream({
  nodeProjection: 'Country',
  relationshipProjection: 'borders'
})
YIELD nodeId, centrality
RETURN gds.util.asNode(nodeId).name AS country, centrality
ORDER BY centrality DESC


// LOUVAIN COMMUNITY
CALL gds.louvain.stream({
  nodeProjection: 'Country',
  relationshipProjection: 'borders'
})
YIELD nodeId, communityId
RETURN gds.util.asNode(nodeId).name as country, communityId
ORDER BY communityId ASC, country





