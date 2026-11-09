import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findUnique({ where: { userId: Number(session?.user?.id) } });
  return (
    <main className="w-full p-8">
      <h1 className="mb-2 text-4xl font-bold text-[#6a51a6]">Welcome to TransactHub</h1>
      <p className="mb-8 text-slate-600">Monitor your wallet and move money securely.</p>
      <div className="max-w-xl"><BalanceCard amount={balance?.amount ?? 0} locked={balance?.locked ?? 0} /></div>
    </main>
  );
}
