import type { NextApiRequest, NextApiResponse } from "next";
import { Unit } from "@unit-finance/unit-node-sdk";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const unit = new Unit(
    process.env.UNIT_TOKEN || "",
    process.env.UNIT_API_URL || ""
  );

  console.log("UNIT CUSTOMER ID", req.body.customerId);

  await unit.accounts.create({
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

  res.status(200).json({ name: "John Doe" });
}
