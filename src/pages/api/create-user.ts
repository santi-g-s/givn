import type { NextApiRequest, NextApiResponse } from "next";
import { verifyIdToken } from "next-firebase-auth";
import { getFirestore } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";

type Data = {
  user: any | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await verifyIdToken(req.body.idToken);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized", user: null });
  }

  const db = getFirestore();

  const cityDoc = await db.collection("city").doc("875491").get();
  const cityData = cityDoc.data();

  await db
    .collection("city")
    .doc("875491")
    .collection("users")
    .doc(user?.id || "")
    .set({
      userId: user?.id || "",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email || "",
      countryCode: "1",
      phone: req.body.phone || cityData?.phone || "",
      address: cityData?.address || "",
      shippingAddress: cityData?.address || "",
      dateOfBirth: Timestamp.fromDate(new Date(req.body.birthday)),
      bio: "",
      pfpURL: "",
      role: "user",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  const resUser = await db
    .collection("city")
    .doc("875491")
    .collection("users")
    .doc(user?.id || "")
    .get();

  res.status(200).json({ user: resUser.data() });
}
