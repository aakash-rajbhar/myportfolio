import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin-auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("portfolio");

    await db
      .collection("blogs")
      .deleteOne({ _id: new ObjectId(id) });

    console.log(`Deleted blog with ID: ${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}