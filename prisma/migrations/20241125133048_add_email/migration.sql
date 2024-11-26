-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('Modern', 'Traditional', 'Long_Dress', 'Five_Panel');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "tags" "Tags";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'example@mail.com';
