import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase-admin/firestore";

type Data = {
  result: any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { pid } = req.query;

  const db = getFirestore();

  const collectionRef = db
    .collection("city")
    .doc("875491")
    .collection("users")
    .doc((pid as string) || "")
    .collection("finance")

    const output = (await collectionRef.orderBy('cardId').limit(1).get()).docs

    const result = <any>[];
  
    for (let i=0; i<output.length; i++) {
      result.push({...output[i].data(), id: output[i].id})
    }
  
    res.status(200).json({
      result
    });
}