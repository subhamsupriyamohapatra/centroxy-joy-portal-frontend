import type { ZenQuote } from "@/types/centroxy";

const ZENQUOTES_ENDPOINT = "/api/zenquotes";
const CACHE_DURATION_MS = 60 * 60 * 1000;

let cachedQuotes: ZenQuote[] = [];
let lastFetchTime = 0;

export const zenquotesService = {
  async getQuotes(): Promise<ZenQuote[]> {
    const now = Date.now();
    if (cachedQuotes.length > 0 && now - lastFetchTime < CACHE_DURATION_MS) {
      return cachedQuotes;
    }

    try {
      const response = await fetch(ZENQUOTES_ENDPOINT);
      if (!response.ok) throw new Error(`ZenQuotes fetch error: ${response.status}`);
      const data: ZenQuote[] = await response.json();
      cachedQuotes = Array.isArray(data) ? data : [];
      lastFetchTime = now;
      return cachedQuotes;
    } catch {
      return cachedQuotes;
    }
  },
};
