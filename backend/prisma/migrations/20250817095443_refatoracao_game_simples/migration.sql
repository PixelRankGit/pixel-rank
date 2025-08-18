/*
  Warnings:

  - You are about to drop the column `description` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `developer` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `metacritic` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Game` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "description",
DROP COLUMN "developer",
DROP COLUMN "genre",
DROP COLUMN "imageUrl",
DROP COLUMN "metacritic",
DROP COLUMN "platform",
DROP COLUMN "price",
DROP COLUMN "publisher",
DROP COLUMN "releaseYear",
DROP COLUMN "tags",
DROP COLUMN "website",
ADD COLUMN     "imagePath" TEXT NOT NULL;
