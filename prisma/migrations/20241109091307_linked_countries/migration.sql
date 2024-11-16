-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "Flag" TEXT,
ADD COLUMN     "Region" TEXT;

-- AlterTable
ALTER TABLE "Wine" ADD COLUMN     "countryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Wine" ADD CONSTRAINT "Wine_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
