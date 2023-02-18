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

  const cityDoc = await db.collection("city").doc("1006131").get();
  const cityData = cityDoc.data();

  const userDoc = await db
    .collection("city")
    .doc(req.body.cityId)
    .collection("users")
    .doc(req.body.user?.id)
    .set({
      userId: req.body.user?.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email || "",
      countryCode: cityData?.countryCode || "",
      phone: req.body.phoneNumber || cityData?.phoneNumber || "",
      address: cityData?.address || "",
      shippingAddress: cityData?.address || "",
      dateOfBirth: req.body.dateOfBirth || "",
      bio: "",
      pfpURL: "",
      role: "user",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

  res.status(200).json({ user: userDoc });
}
