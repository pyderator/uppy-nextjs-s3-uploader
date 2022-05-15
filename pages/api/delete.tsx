import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";
import { s3 } from "../../utility/S3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ msg: "File ID is required" });
    }

    const file = await prisma.keyStore.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!file) {
      return res.status(404).json({ msg: "No such file" });
    }

    const s3DeleteResponse = await s3
      .deleteObject({
        Key: file.key,
        Bucket: file.bucketName,
      })
      .promise();

    if (s3DeleteResponse.$response.data) {
      await prisma.keyStore.delete({
        where: {
          id: file.id,
        },
      });

      return res.status(200).json({ msg: "File deleted successfully" });
    }

    throw new Error("Something went wrong");
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
