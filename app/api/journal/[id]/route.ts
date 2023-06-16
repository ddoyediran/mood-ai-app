import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json();
  console.log(content);

  const user = await getUserByClerkId();

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: content,
  });

  const analysis = await analyze(updatedEntry.content);

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: { ...analysis },
    create: {
      entryId: updatedEntry.id,
      // userId: user.id,
      ...analysis,
    },
  });

  console.log(updatedAnalysis);

  return NextResponse.json({ data: { ...updatedEntry } });
};
