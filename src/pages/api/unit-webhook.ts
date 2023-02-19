import type { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookies } from "next-firebase-auth";
import { getFirestore } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";

type Data = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const db = getFirestore();
  const events = req.body.data;
  console.log("EVENTS", events);
  await Promise.all(
    events.map(async (event: any) => {
      if (event.type === "transaction.created") {
        const customer = event.relationships.customer;
        const account = event.relationships.account;
        const card = event.relationships.card;
        const userQuery = db
          .collection("city")
          .doc(customer.data.id)
          .collection("users")
          .where("accountId", "==", account.data.id);
        const userDoc = await userQuery.get();
        const userRef = userDoc.docs[0].ref;

        await userRef
          .collection("finance")
          .doc(card.data.id)
          .set(
            {
              amount:
                event.attributes.direction === "Debit"
                  ? FieldValue.increment(-event.attributes.amount)
                  : FieldValue.increment(event.attributes.amount),
              updatedAt: FieldValue.serverTimestamp(),
            },
            {
              merge: true,
            }
          );
      }
    })
  );

  res.status(200);
}
