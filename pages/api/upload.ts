import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";
import { s3 } from "../../utility/S3";

interface IFileDTO {
  filename: string;
  isMain: boolean;
  contentType: string;
}

export default function resolver(req: NextApiRequest, res: NextApiResponse) {
  const data: IFileDTO = JSON.parse(req.body.data);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${data.filename}-${Date.now().toString()}`,
    ContentType: data.contentType,
  };

  return new Promise((resolve, _) => {
    try {
      s3.getSignedUrl("putObject", params, async (err, url) => {
        // Save file information to database after generating signed url for the request

        await prisma.keyStore.create({
          data: {
            isMain: Boolean(data.isMain) ?? false,
            key: params.Key,
            bucketName: params.Bucket!,
            region: process.env.AWS_REGION!,
            filename: data.filename,
          },
        });

        // Filename can be similar
        return res.status(200).json({
          method: "put",
          url,
          key: params.Key,
        });
      });
    } catch (err) {
      res.status(400).json(err);
      resolve("");
    }
  });
}
