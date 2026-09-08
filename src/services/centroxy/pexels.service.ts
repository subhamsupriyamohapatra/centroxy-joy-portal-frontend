const PEXELS_ENDPOINT = "/api/pexels";
const STORAGE_KEY = "pexels_nature_backgrounds";

function getDateKey(): string {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

type CachedBackgrounds = {
  date: string;
  images: string[];
};

export const pexelsService = {
  async getNatureBackgrounds(count: number): Promise<string[]> {
    const safeCount = Math.max(1, Math.min(60, Math.floor(count)));
    const today = getDateKey();

    try {
      const cachedRaw = localStorage.getItem(STORAGE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as CachedBackgrounds;
        if (
          cached.date === today &&
          Array.isArray(cached.images) &&
          cached.images.length >= safeCount
        ) {
          return cached.images;
        }
      }
    } catch {
      // Ignore corrupted cache
    }

    try {
      const response = await fetch(`${PEXELS_ENDPOINT}?count=${safeCount}`);
      if (!response.ok) throw new Error(`Pexels fetch error: ${response.status}`);
      const data: { images?: string[] } = await response.json();
      const images = Array.isArray(data.images) ? data.images : [];

      if (images.length > 0) {
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ date: today, images })
          );
        } catch {
          // Ignore storage quota errors
        }
      }

      return images;
    } catch {
      return [];
    }
  },
};