/*
  Warnings:

  - You are about to drop the column `grapes` on the `Wine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Wine" DROP COLUMN "grapes";

-- CreateTable
CREATE TABLE "_WineToGrape" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WineToGrape_AB_unique" ON "_WineToGrape"("A", "B");

-- CreateIndex
CREATE INDEX "_WineToGrape_B_index" ON "_WineToGrape"("B");

-- AddForeignKey
ALTER TABLE "_WineToGrape" ADD CONSTRAINT "_WineToGrape_A_fkey" FOREIGN KEY ("A") REFERENCES "Grape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WineToGrape" ADD CONSTRAINT "_WineToGrape_B_fkey" FOREIGN KEY ("B") REFERENCES "Wine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
