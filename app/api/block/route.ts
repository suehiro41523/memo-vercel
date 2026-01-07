import { db } from "@/lib/db";
import { block } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const blocks = await db.select().from(block);
  return NextResponse.json(blocks);
}

export async function POST(req: Request) {
  const body = await req.json();

  await db.insert(block).values({
    blockType: body.blockType,
    parent: body.parent,
    order: body.order,
    content: body.content,
  });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
  const body = await req.json();

  if (!body.id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const { id, ...updates } = body;

  await db.update(block).set(updates).where(eq(block.id, id));

  return NextResponse.json({ ok: true });
}
