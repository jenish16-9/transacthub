import express from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();
app.use(express.json());

const paymentSchema = z.object({
  token: z.string(),
  userId: z.number(),
  amount: z.string(),
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

    if (onRampTransaction && onRampTransaction.status === "Processing") {
      await db.$transaction([
        db.balance.update({
          where: {
            userId: paymentInformation.userId,
          },
          data: {
            amount: {
              increment: Number(paymentInformation.amount),
            },
          },
        }),

        db.onRampTransaction.update({
          where: {
            token: paymentInformation.token,
          },
          data: {
            status: "Success",
          },
        }),
      ]);
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
