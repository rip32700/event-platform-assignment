/*
  Warnings:

  - You are about to alter the column `price_per_person` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "price_per_person" SET DATA TYPE INTEGER;
