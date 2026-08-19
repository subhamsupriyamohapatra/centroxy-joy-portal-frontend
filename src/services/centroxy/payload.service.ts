import type { Employee, Media } from "@/payload-types";

export type PayloadEmployee = {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
  photoUrl: string;
};

function getPayloadApiUrl(): string {
  if (process.env.NEXT_PUBLIC_PAYLOAD_API_URL) {
    return process.env.NEXT_PUBLIC_PAYLOAD_API_URL;
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:3000";
}

function resolveMediaUrl(photo: Employee["photo"]): string {
  if (!photo) return "";
  if (typeof photo === "number") return "";
  const media = photo as Partial<Media>;
  return media.url || media.thumbnailURL || "";
}

export async function searchEmployees(query: string): Promise<PayloadEmployee[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const url = new URL(`${getPayloadApiUrl()}/api/employees`);
  url.searchParams.set("where[name][contains]", trimmed);
  url.searchParams.set("limit", "8");
  url.searchParams.set("depth", "1");

  try {
    const response = await fetch(url.toString(), { cache: "no-store" });
    if (!response.ok) return [];

    const data = (await response.json()) as {
      docs?: Employee[];
    };

    return (data.docs ?? []).map((doc) => ({
      id: doc.id,
      name: doc.name,
      email: doc.email ?? "",
      department: doc.department ?? "",
      designation: doc.designation ?? "",
      photoUrl: resolveMediaUrl(doc.photo),
    }));
  } catch {
    return [];
  }
}
