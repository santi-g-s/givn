import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { amount, accountId } = req.body;

    if (parseFloat(amount) < 0) {
      return res.status(400).json({ error: "Invalid amount." });
    }

    await axios.post(
      "https://api.s.unit.sh/sandbox/payments",
      {
        data: {
          type: "achPayment",
          attributes: {
            amount: parseFloat(amount) * 100,
            direction: "Credit",
            description: "Donation",
          },
          relationships: {
            account: {
              data: {
                type: "depositAccount",
                id: accountId,
              },
            },
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${process.env.UNIT_TOKEN}`,
        },
      }
    );

    return res.status(200).json({ success: true });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Unexpected error." });
  }
};

export default handler;
