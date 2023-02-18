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
  const user = await getUserFromCookies({ req, includeToken: true });
  const db = getFirestore();

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  console.log("REQ BODY", req.body);

  const taskRef = db
    .collection(req.body.city)
    .doc(user?.id || "")
    .collection("tasks")
    .doc(req.body.taskId);
  const taskDoc = await taskRef.get();
  const taskData = taskDoc.data();

  const cardRef = db
    .collection(req.body.city)
    .doc(user?.id || "")
    .collection("cards")
    .doc(req.body.cardId);
  const cardDoc = await cardRef.get();
  const cardData = cardDoc.data();

  if (!taskData || !cardData) {
    return res.status(404).json({ error: "Task or card not found" });
  }

  const batch = db.batch();
  batch.set(
    taskRef,
    {
      completedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  batch.set(
    cardRef,
    {
      amount: FieldValue.increment(taskData.amount),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  await batch.commit();

  res.status(200);
}
