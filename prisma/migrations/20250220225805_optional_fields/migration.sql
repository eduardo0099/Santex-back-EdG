-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "nationality" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "shortName" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;
