-- CreateTable
CREATE TABLE "Grape" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WineType" NOT NULL DEFAULT 'RED',

    CONSTRAINT "Grape_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Grape_name_key" ON "Grape"("name");
