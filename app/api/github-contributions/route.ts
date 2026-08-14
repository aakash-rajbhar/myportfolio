import { NextResponse } from "next/server";
import { profile } from "@/lib/data";

// Revalidate at most once an hour — contribution data doesn't need to be
// fetched fresh on every page load.
export const revalidate = 3600;

export async function GET() {
  const username = profile.links.github.split("/").pop();

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "upstream error" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 502 });
  }
}
