"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export const SendCard = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    userId: number;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <div className="h-[90vh] bg-gray-100">
      <Center>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Card title="Send Money">
            <div className="min-w-72 pt-2">
              <TextInput
                placeholder={"Number"}
                label="Number"
                onChange={(value) => {
                  setNumber(value);
                }}
              />
              <TextInput
                placeholder={"Amount"}
                label="Amount"
                onChange={(value) => {
                  setAmount(Number(value));
                }}
              />
              <div className="pt-4 flex justify-center">
                <Button
                  onClick={async () => await p2pTransfer(number, amount * 100)}
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
          <Card title="Recent Transactions">
            <div className="pt-2 max-h-72 overflow-y-auto">
              {transactions.map((t, index) => (
                <div
                  key={index}
                  className="flex justify-between mt-2 bg-white p-2 rounded-md shadow-sm"
                >
                  <div className="mr-5">
                    <div className="text-sm font-semibold">
                      Debited to User ID : {t.userId.toString()}
                    </div>
                    <div className="text-slate-600 text-xs">
                      {t.time.toDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-red-600 font-bold">
                    - Rs {t.amount / 100}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Center>
    </div>
  );
};
