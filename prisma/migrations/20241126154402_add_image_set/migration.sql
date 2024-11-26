/*
  Warnings:

  - You are about to drop the column `imageString` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageString",
ADD COLUMN     "imageSet" TEXT[],
ADD COLUMN     "mainImageString" TEXT;
