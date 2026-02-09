-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ELECTRONICS', 'BOOKS', 'FASHION', 'ACADEMICS', 'OTHER');

-- AlterTable
ALTER TABLE "Product" 
ADD COLUMN "category" "Category" NOT NULL DEFAULT 'OTHER',
DROP COLUMN "description",
DROP COLUMN "pickupLocation";
