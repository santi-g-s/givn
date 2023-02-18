import type { NextApiRequest, NextApiResponse } from "next";
import { getUserFromCookies } from "next-firebase-auth";
import { getFirestore } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";

type Data = {
  user: any | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await getUserFromCookies({ req, includeToken: true });

  if (!user) {
    return res.status(401).json({ error: "Unauthorized", user: null });
  }

  const db = getFirestore();

  console.log("REQ BODY", req.body);

  const userDoc = await db
    .collection(req.body.city)
    .doc(req.body.user?.id)
    .set({
      userId: req.body.user?.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email || "",
      countryCode: req.body.countryCode || "",
      phone: req.body.phoneNumber || "",
      address: req.body.address || "",
      shippingAddress: req.body.shippingAddress || "",
      dateOfBirth: req.body.dateOfBirth || "",
      bio: "",
      pfpURL: "",
      role: "user",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

  res.status(200).json({ user: userDoc });
}
