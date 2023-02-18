import type { NextApiRequest, NextApiResponse } from "next";
import { Card, Unit, UnitResponse } from "@unit-finance/unit-node-sdk";
import { getUserFromCookies } from "next-firebase-auth";
import { getFirestore } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";

type Data = {
  card: UnitResponse<Card> | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await getUserFromCookies({ req, includeToken: true });

  if (!user) {
    return res.status(401).json({ error: "Unauthorized", card: null });
  }

  const unit = new Unit(
    process.env.UNIT_TOKEN || "",
    process.env.UNIT_API_URL || ""
  );

  const db = getFirestore();

  console.log("REQ BODY", req.body);

  const card = await unit.cards.createDebitCard({
    type: "businessDebitCard",
    attributes: {
      fullName: {
        first: req.body.firstName,
        last: req.body.lastName,
      },
      dateOfBirth: req.body.dateOfBirth,
      shippingAddress: req.body.shippingAddress,
      address: req.body.address,
      phone: {
        countryCode: req.body.countryCode,
        number: req.body.phoneNumber,
      },
      email: req.body.email,
    },
    relationships: {
      account: req.body.accountId,
    },
  });

  await db
    .collection("city")
    .doc(req.body.cityId)
    .collection("users")
    .doc(req.body.user?.id)
    .collection("finance")
    .doc(user.id + "_" + card.data.id)
    .set({
      cardId: card.data.id,
      accountId: req.body.accountId,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      amount: 0,
    });

  res.status(200).json({ card });
}
