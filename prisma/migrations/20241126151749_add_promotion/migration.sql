-- CreateEnum
CREATE TYPE "Promotion" AS ENUM ('Sale', 'Best_Seller');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "promotion" "Promotion";
