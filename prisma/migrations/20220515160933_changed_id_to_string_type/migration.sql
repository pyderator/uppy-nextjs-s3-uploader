/*
  Warnings:

  - The primary key for the `KeyStore` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "KeyStore" DROP CONSTRAINT "KeyStore_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "KeyStore_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "KeyStore_id_seq";
