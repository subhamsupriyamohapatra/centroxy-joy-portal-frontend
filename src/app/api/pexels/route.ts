export const dynamic = "force-dynamic";

const NATURE_SUBJECTS = [
  "forest",
  "mountain landscape",
  "beach ocean",
  "sunset sky",
  "flowers field",
  "waterfall",
  "lake nature",
  "green valley",
];

const MAX_SLIDES = 60;

type PexelsPhoto = {
  id: number;
  src: {
    large2x?: string;
    large?: string;
  };
};

type PexelsSearchResponse = {
  photos?: PexelsPhoto[];
};

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function buildImageUrl(photo: PexelsPhoto): string {
  const base = photo.src?.large2x || photo.src?.large || "";
  if (!base) return "";
  const clean = base.split("?")[0];
  return `${clean}?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop`;
}

export async function GET(request: Request) {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    return Response.json({ images: [] });
  }

  const url = new URL(request.url);
  const count = Math.max(1, Math.min(MAX_SLIDES, Number(url.searchParams.get("count")) || 1));
  const subject = pickRandom(NATURE_SUBJECTS);

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(subject)}&orientation=landscape&per_page=80`,
      {
        headers: { Authorization: apiKey },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return Response.json({ images: [] });
    }

    const data = (await res.json()) as PexelsSearchResponse;
    const photos = Array.isArray(data.photos) ? data.photos : [];
    const shuffled = [...photos].sort(() => Math.random() - 0.5);
    const images = shuffled
      .slice(0, count)
      .map((photo) => buildImageUrl(photo))
      .filter(Boolean);

    return Response.json({ images });
  } catch {
    return Response.json({ images: [] }, { status: 502 });
  }
}