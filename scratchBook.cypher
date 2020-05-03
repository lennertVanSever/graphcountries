// get the graph diameter
MATCH (a:Country), (b:Country) WHERE id(a) > id(b)
MATCH p=shortestPath((a)-[:borders*]-(b))
WITH length(p) AS len, p
ORDER BY len DESC LIMIT 1
RETURN p

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