import type { NextApiRequest, NextApiResponse } from "next";
import { Account, Unit, UnitResponse } from "@unit-finance/unit-node-sdk";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getUserFromCookies } from "next-firebase-auth";

type Data = {
  account: UnitResponse<Account> | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await getUserFromCookies({ req, includeToken: true });

  if (!user) {
    return res.status(401).json({ error: "Unauthorized", account: null });
  }

  const unit = new Unit(
    process.env.UNIT_TOKEN || "",
    process.env.UNIT_API_URL || ""
  );

  console.log("UNIT CUSTOMER ID", req.body.customerId);

  const account = await unit.accounts.create({
    type: "depositAccount",
    attributes: {
      depositProduct: "checking",
    },
    relationships: {
      customer: {
        data: {
          type: "customer",
          id: req.body.customerId,
        },
      },
    },
  });

  const db = getFirestore();

  await db
    .collection(req.body.city)
    .doc(req.body.user?.id)
    .collection("finance")
    .doc("account")
    .set({
      accountId: account.data.id,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

  res.status(200).json({ account });
}
