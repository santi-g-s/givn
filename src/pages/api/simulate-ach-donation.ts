import type { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../initAuth";

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await setAuthCookies(req, res);
    return res.status(200).json({ success: true });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Unexpected error." });
  }
};

export default handler;
