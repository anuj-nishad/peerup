import { NextResponse } from "next/server";
import db from "@repo/db/client";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {

  // await auth().protect();
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findFirst({where:{id: userId}})
  
  if(!user){
  await db.user.create({
    data: {
      id: userId,
      email: `${userId}@example.com`,
    },
  });
}

  const { interests, skills, name } = await request.json();

  const existingProfile = await db.peerProfile.findUnique({
    where: { userId },
    include: { skills: true },
  });

  if (existingProfile) {
    return NextResponse.json({ message: "Profile already exists", profile: existingProfile }, { status: 200 });
  }

  const profile = await db.peerProfile.create({
    data: {
      name,
      userId,
      interests,
      skills: { create: skills.map((name: string) => ({ name })) },
    },
    include: { skills: true }
  });
  

  return NextResponse.json({msg: "Profile Created Succesfully", profile});
}

export async function GET() {
  // await auth().protect();
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await db.peerProfile.findUnique({
    where: { userId },
    include: { skills: true},
  });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
  return NextResponse.json(profile);
}

export async function PATCH(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { interests, skills,name } = await request.json();

  const profile = await db.peerProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    return new Response("Profile not found", { status: 404 });
  }

  // 1. Delete existing skills
  await db.skill.deleteMany({
    where: {
      profileId: profile.id,
    },
  });

  // 2. Create new skills
  const skillData = skills.map((skillName: string) => ({
    name: skillName,
    profileId: profile.id,
  }));

  await db.skill.createMany({
    data: skillData,
  });

  // 3. Update interests (only simple fields)
  const updatedProfile = await db.peerProfile.update({
    where: {
      id: profile.id,
    },
    data: {
      name,
      interests,
    },
    include: {
      skills: true,
    },
  });

  return Response.json(updatedProfile);
}
