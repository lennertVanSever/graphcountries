// get the graph diameter
MATCH (a:Country), (b:Country) WHERE id(a) > id(b)
MATCH p=shortestPath((a)-[:borders*]-(b))
WITH length(p) AS len, p
ORDER BY len DESC LIMIT 1
RETURN p
