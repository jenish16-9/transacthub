"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  if (!Number.isInteger(amount) || amount <= 0) {
    return { message: "Amount must be positive" };
  }
  const session = await getServerSession(authOptions);
  const fromId = session?.user?.id;

  if (!fromId) {
    return { message: "Error while sending" };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromId)} FOR UPDATE`;

    const fromUserBalance = await tx.balance.findUnique({
      where: { userId: Number(fromId) },
    });

    if (!fromUserBalance || fromUserBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: { userId: Number(fromId) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });

    await tx.p2pTransfer.create({
      data: {
        amount,
        timestamp: new Date(),
        fromUserId: Number(fromId),
        toUserId: toUser.id,
      },
    });
    });
    return { message: "Transfer successful" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Transfer failed" };
  }
}
