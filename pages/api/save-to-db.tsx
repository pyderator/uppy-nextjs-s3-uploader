import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";

interface IFileDTO {
  key: string;
  isMain: boolean;
  file: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await prisma.keyStore.createMany({
    data: req.body.data,
  });
  if (response.count > 0) {
    return res
      .status(201)
      .json({ msg: "File info saved to database successfully" });
  }

  return res.status(500).json({ msg: "Something went wrong" });
}
