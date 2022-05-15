/*
  Warnings:

  - You are about to drop the column `name` on the `KeyStore` table. All the data in the column will be lost.
  - Added the required column `bucketName` to the `KeyStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `KeyStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `KeyStore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KeyStore" DROP COLUMN "name",
ADD COLUMN     "bucketName" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "isUploaded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
