/*
  Warnings:

  - A unique constraint covering the columns `[steamId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `steamId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "description" TEXT,
ADD COLUMN     "developer" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "metacritic" INTEGER,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "publisher" TEXT,
ADD COLUMN     "steamId" INTEGER NOT NULL,
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Game_steamId_key" ON "public"."Game"("steamId");
