/*
  Warnings:

  - You are about to drop the column `postetUrl` on the `Movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "postetUrl",
ADD COLUMN     "posterUrl" TEXT;
