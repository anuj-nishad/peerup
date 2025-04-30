import { auth } from "@clerk/nextjs/server";
import db from "@repo/db/client";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existingUser = await db.user.findUnique({ where: { id: userId } });

  if (!existingUser) {
    await db.user.create({
      data: {
        id: userId,
        email: `${userId}@example.com`,
      },
    });
  }

  return NextResponse.json({ status: "ok" });
}
