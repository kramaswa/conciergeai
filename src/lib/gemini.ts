const queryCache = new Map<string, any>();

export async function parseTravelQuery(query: string, userPreferences?: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const cacheKey = userPreferences ? `${normalizedQuery}__${userPreferences}` : normalizedQuery;
  if (queryCache.has(cacheKey)) {
    console.log("Returning cached travel query result for:", query);
    return queryCache.get(cacheKey);
  }

  try {
    const response = await fetch("/api/parse-query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, userPreferences }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Parse query server error:", result);
      throw new Error(result.message || "Failed to parse query");
    }
    if (result?.error) {
      console.error("Parse query returned error:", result.error);
      throw new Error(result.message || "Failed to parse query");
    }

    if (result) queryCache.set(cacheKey, result);
    return result;
  } catch (e) {
    console.error("Parse query error:", e);
    return null;
  }
}
