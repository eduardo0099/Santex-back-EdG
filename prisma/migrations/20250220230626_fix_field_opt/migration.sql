/*
  Warnings:

  - Made the column `name` on table `Coach` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Coach" ALTER COLUMN "name" SET NOT NULL;
