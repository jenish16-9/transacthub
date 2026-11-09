import express from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();
app.use(express.json());

const paymentSchema = z.object({
  token: z.string(),
  userId: z.number().int().positive(),
  amount: z.coerce.number().positive(),
});

app.post("/hdfcWebhook", async (req, res) => {
  const validation = paymentSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.errors });
  }

  const paymentInformation = validation.data;

  try {
    const onRampTransaction = await db.onRampTransaction.findUnique({
      where: {
        token: paymentInformation.token,
      },
    });

    if (onRampTransaction?.status === "Processing" && onRampTransaction.userId === paymentInformation.userId) {
      await db.$transaction(async (tx) => {
        const claimed = await tx.onRampTransaction.updateMany({
          where: { token: paymentInformation.token, status: "Processing" },
          data: { status: "Success" },
        });
        if (claimed.count !== 1) throw new Error("Webhook already processed");
        await tx.balance.update({
          where: { userId: paymentInformation.userId },
          data: { amount: { increment: onRampTransaction.amount } },
        });
      });
      res.status(200).json({ message: "Transaction successful" });
    } else {
      res.status(400).json({ message: "Transaction cannot be processed" });
    }
  } catch (e: any) {
    res.status(411).json({ message: "Error while processing webhook" });
  }
});

app.listen(3003, () => {
  console.log("Server running on port 3003");
});

export default app;
