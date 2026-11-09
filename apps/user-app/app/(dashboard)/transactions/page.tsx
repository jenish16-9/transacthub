import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function Transactions() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const [onRamp, transfers] = await Promise.all([
    prisma.onRampTransaction.findMany({ where: { userId }, orderBy: { startTime: "desc" }, take: 20 }),
    prisma.p2pTransfer.findMany({ where: { OR: [{ fromUserId: userId }, { toUserId: userId }] }, orderBy: { timestamp: "desc" }, take: 20 }),
  ]);
  return (
    <main className="w-full p-8">
      <h1 className="mb-6 text-3xl font-bold text-[#6a51a6]">Transaction History</h1>
      <div className="space-y-3">
        {onRamp.map((transaction) => <div key={`onramp-${transaction.id}`} className="flex justify-between rounded bg-white p-4 shadow-sm"><span>{transaction.provider} · {transaction.status}</span><span className="text-green-600">+ Rs {transaction.amount / 100}</span></div>)}
        {transfers.map((transaction) => <div key={`transfer-${transaction.id}`} className="flex justify-between rounded bg-white p-4 shadow-sm"><span>P2P transfer · {transaction.timestamp.toDateString()}</span><span className={transaction.fromUserId === userId ? "text-red-600" : "text-green-600"}>{transaction.fromUserId === userId ? "-" : "+"} Rs {transaction.amount / 100}</span></div>)}
        {!onRamp.length && !transfers.length && <p className="rounded bg-white p-4 text-slate-600">No transactions yet.</p>}
      </div>
    </main>
  );
}
