import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin-auth";

interface CreateBlogBody {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
}

export async function POST(req: Request) {
  try {
    if (!verifyAdmin()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: CreateBlogBody = await req.json();

    const { title, slug, content, excerpt } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");

    await db.collection("blogs").insertOne({
      title,
      slug,
      content,
      excerpt,
      published_at: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}