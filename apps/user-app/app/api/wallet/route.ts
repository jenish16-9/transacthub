import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  const balance = await prisma.balance.findUnique({ where: { userId } });
  return NextResponse.json({ amount: balance?.amount ?? 0, locked: balance?.locked ?? 0, updatedAt: new Date().toISOString() });
}
