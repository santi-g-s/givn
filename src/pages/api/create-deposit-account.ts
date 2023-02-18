import type { NextApiRequest, NextApiResponse } from "next";
import { Account, Unit, UnitResponse } from "@unit-finance/unit-node-sdk";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { verifyIdToken } from "next-firebase-auth";

type Data = {
  account: UnitResponse<Account> | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await verifyIdToken(req.body.idToken);

  const unit = new Unit(
    process.env.UNIT_TOKEN || "",
    process.env.UNIT_API_URL || ""
  );

  const account = await unit.accounts.create({
    type: "depositAccount",
    attributes: {
      depositProduct: "checking",
    },
    relationships: {
      customer: {
        data: {
          type: "customer",
          id: req.body.cityId,
        },
      },
    },
  });

  const db = getFirestore();

  await db
    .collection("city")
    .doc(req.body.cityId)
    .collection("users")
    .doc(user?.id || "")
    .set(
      {
        accountId: account.data.id,
        updatedAt: FieldValue.serverTimestamp(),
      },
      {
        merge: true,
      }
    );

  res.status(200).json({ account });
}
