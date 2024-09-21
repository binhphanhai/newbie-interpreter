// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { interpret } from "../../helper/interpretUtils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body;
  try {
    const { tree, result } = interpret(code);
    res.status(200).json({ tree, result });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
