import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default function resolver(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body.data);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${data.filename}-${Date.now().toString()}`,
    ContentType: data.contentType,
  };
  return new Promise((resolve, _) => {
    try {
      s3.getSignedUrl("putObject", params, async (err, url) => {
        await prisma.keyStore.create({
          data: {
            key: params.Key,
          },
        });
        return res.status(200).json({
          method: "put",
          url,
        });
      });
    } catch (err) {
      res.status(400).json(err);
      resolve("");
    }
  });
}
