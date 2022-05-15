import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data }: { data: { key: string } } = req.body;

  const response = await prisma.keyStore.updateMany({
    // Selecting all the records where key matches
    where: {
      key: data.key,
    },
    // Updating the isUploaded status
    data: {
      isUploaded: true,
    },
  });

  if (response.count > 0) {
    return res
      .status(201)
      .json({ msg: "File info saved to database successfully" });
  }

  return res.status(500).json({ msg: "Something went wrong" });
}
