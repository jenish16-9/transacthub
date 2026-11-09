"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { randomUUID } from "crypto";

export async function createOnRampTransaction(
  provider: string,
  amount: number,
) {
  if (!Number.isFinite(amount) || amount <= 0) return { message: "Amount must be positive" };
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  const token = randomUUID();
  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(session?.user?.id),
      amount: amount * 100,
    },
  });

  return {
    message: "Done",
  };
}
