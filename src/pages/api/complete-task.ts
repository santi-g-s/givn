import type { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookies } from "next-firebase-auth";
import { getFirestore } from "firebase-admin/firestore";
import { getApp } from "firebase-admin/app";
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
    .collection("users")
    .doc(req.body.uid || "")
    .collection("tasks")
    .doc(req.body.taskId);
  const taskDoc = await taskRef.get();
  const taskData = taskDoc.data();

  // const cardRef = db
  //   .collection("city")
  //   .doc(req.body.cityId)
  //   .collection("users")
  //   .doc(user?.id || "")
  //   .collection("cards")
  //   .doc(req.body.cardId);
  // const cardDoc = await cardRef.get();
  // const cardData = cardDoc.data();

  if (!taskData) {
    return res.status(404).json({ error: "Task not found" });
  }

  const batch = db.batch();
  batch.set(
    taskRef,
    {
      isComplete: true,
      completedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  // batch.set(
  //   cardRef,
  //   {
  //     amount: FieldValue.increment(taskData.amount),
  //     updatedAt: FieldValue.serverTimestamp(),
  //   },
  //   { merge: true }
  // );
  await batch.commit();

  res.status(200);
}
