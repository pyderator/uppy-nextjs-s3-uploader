import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";
import { s3 } from "../../utility/S3";

const getPagination = (
  data: any,
  total: number,
  page: number,
  limit: number
) => {
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(total / limit);

  return {
    totalPages,
    currentPage,
    data,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const PER_PAGE_DATA = 2;

  if (req.method?.toUpperCase() !== "GET") {
    return res.status(400).json({ message: "Error. Only GET Method is valid" });
  }

  let { page, limit } = req.query;

  if (!page) page = "0";
  if (!limit) limit = PER_PAGE_DATA.toString();

  let results = await prisma.keyStore.findMany({
    skip: parseInt(page as string) * PER_PAGE_DATA,
    take: parseInt(limit as string) || 2,
    select: {
      id: true,
      filename: true,
      isMain: true,
      key: true,
    },
  });

  const newResults = results.map((r: any) => {
    const url = s3.getSignedUrl("getObject", {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: r.key,
      Expires: 60 * 60,
    });
    return { ...r, url };
  });

  const total = await prisma.keyStore.count();

  const paginatedData = getPagination(
    newResults,
    total,
    parseInt(page as string),
    parseInt(limit as string)
  );

  return res.status(200).json(paginatedData);
}
