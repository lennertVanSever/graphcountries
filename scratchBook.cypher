MATCH (from:Country {code: "BEL"})
MATCH (to:Country {code: "TUR"})
MATCH p = shortestPath((from)-[:borders*]-(to))
return p


// graph diameter
MATCH (a:Country), (b:Country) WHERE id(a) > id(b)
MATCH p=shortestPath((a)-[:borders*]-(b))
WITH length(p) AS len, p
ORDER BY len DESC LIMIT 1
RETURN p