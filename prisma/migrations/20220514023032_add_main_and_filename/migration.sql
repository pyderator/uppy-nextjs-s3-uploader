/*
  Warnings:

  - Added the required column `isMain` to the `KeyStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `KeyStore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KeyStore" ADD COLUMN     "isMain" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
