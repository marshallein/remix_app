-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "collectionId" INTEGER;

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "collectionName" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
