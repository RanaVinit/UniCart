/*
  Warnings:

  - You are about to drop the column `pickupLocation` on the `Product` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'COMPLETED';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "pickupLocation",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "publicId" TEXT;
