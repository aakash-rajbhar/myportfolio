import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ published_at: -1 })
      .toArray();

    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}