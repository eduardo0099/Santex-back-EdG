-- DropIndex
DROP INDEX "Team_tla_key";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "tla" DROP NOT NULL;
