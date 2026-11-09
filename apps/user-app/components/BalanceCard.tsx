import { Card } from "@repo/ui/card";
import { useWallet } from "../context/WalletContext";

export const BalanceCard = ({
  amount,
  locked,
}: { amount?: number; locked?: number }) => {
  const wallet = useWallet();
  const currentAmount = wallet.updatedAt ? wallet.amount : amount ?? 0;
  const currentLocked = wallet.updatedAt ? wallet.locked : locked ?? 0;
  return (
    <Card title={"Balance"}>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Unlocked balance</div>
        <div>{currentAmount / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Locked Balance</div>
        <div>{currentLocked / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Balance</div>
        <div>{(currentLocked + currentAmount) / 100} INR</div>
      </div>
    </Card>
  );
};
