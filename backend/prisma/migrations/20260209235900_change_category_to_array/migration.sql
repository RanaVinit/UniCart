-- AlterTable
ALTER TABLE "Product" ADD COLUMN "categories" "Category"[] DEFAULT ARRAY[]::"Category"[];

-- Migrate existing data
UPDATE "Product" SET "categories" = ARRAY["category"]::"Category"[];

-- Drop old column
ALTER TABLE "Product" DROP COLUMN "category";
