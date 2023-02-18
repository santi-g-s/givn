import type { NextApiRequest, NextApiResponse } from "next";
import { Card, Unit, UnitResponse } from "@unit-finance/unit-node-sdk";

type Data = {
  card: UnitResponse<Card>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const unit = new Unit(
    process.env.UNIT_TOKEN || "",
    process.env.UNIT_API_URL || ""
  );

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

  res.status(200).json({ card });
}
