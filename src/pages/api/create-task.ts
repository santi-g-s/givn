import type { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookies } from "next-firebase-auth";
import { getFirestore } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";

type Data = {
  task: any | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await getUserFromCookies({ req, includeToken: true });
  const db = getFirestore();

  const userDoc = await db
    .collection("city")
    .doc(user?.id || "")
    .get();
  const userData = userDoc.data();

  if (!userData || userData.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized", task: null });
  }

  console.log("REQ BODY", req.body);

  const task = await db
    .collection("city")
    .doc(req.body.cityId)
    .collection("users")
    .doc(req.body.cityId)
    .collection("users")
    .doc(req.body.user?.id)
    .collection("tasks")
    .doc(req.body.taskId)
    .set({
      description: req.body.description,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      amount: req.body.amount,
    });

  res.status(200).json({ task });
}
