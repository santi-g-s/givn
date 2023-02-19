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

  console.log("REQ BODY", req.body);

  const taskRef = db
    .collection("city")
    .doc(req.body.cityId)
    .collection("tasks")
    .doc();

  const batch = db.batch();
  batch.set(
    taskRef,
    {
      isComplete: false,
      articleText: req.body.text,
      title: req.body.title,
      amount: req.body.amount,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  await batch.commit();

  res.status(200);
}
