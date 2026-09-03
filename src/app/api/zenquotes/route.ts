import type { ZenQuote } from "@/types/centroxy";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/quotes", {
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json(
        { error: `ZenQuotes API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data: ZenQuote[] = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: "ZenQuotes API unavailable" }, { status: 502 });
  }
}
