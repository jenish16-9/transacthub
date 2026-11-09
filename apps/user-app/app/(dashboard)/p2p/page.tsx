import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    userId: t.toUserId,
  }));
}

export default async function asy() {
  const transactions = await getOnRampTransactions();
  return (
    <div className="w-full">
      <SendCard transactions={transactions} />
    </div>
  );
}
