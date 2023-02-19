import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase-admin/firestore";

type Data = {
  user: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { pid } = req.query;

  const db = getFirestore();

  const userRef = db
    .collection("city")
    .doc("875491")
    .collection("users")
    .doc((pid as string) || "");
  const userDoc = await userRef.get();
  const userData = userDoc.data();

  res.status(200).json({
    user: userData,
  });
}
