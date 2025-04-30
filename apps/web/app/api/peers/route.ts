// app/api/peers/route.ts

import  db  from "@repo/db/client";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const peers = await db.peerProfile.findMany({
    where: {
      NOT: {
        userId: userId, // Don't show yourself
      },
    },
    include: {
      skills: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  return Response.json(peers);
}
