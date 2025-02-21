/*
  Warnings:

  - You are about to drop the `PlayerTeam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamCompetition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerTeam" DROP CONSTRAINT "PlayerTeam_playerId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerTeam" DROP CONSTRAINT "PlayerTeam_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamCompetition" DROP CONSTRAINT "TeamCompetition_competitionId_fkey";

-- DropForeignKey
ALTER TABLE "TeamCompetition" DROP CONSTRAINT "TeamCompetition_teamId_fkey";

-- DropTable
DROP TABLE "PlayerTeam";

-- DropTable
DROP TABLE "TeamCompetition";

-- CreateTable
CREATE TABLE "_TeamsOnCompetitions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TeamsOnCompetitions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PlayersOnTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlayersOnTeams_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TeamsOnCompetitions_B_index" ON "_TeamsOnCompetitions"("B");

-- CreateIndex
CREATE INDEX "_PlayersOnTeams_B_index" ON "_PlayersOnTeams"("B");

-- AddForeignKey
ALTER TABLE "_TeamsOnCompetitions" ADD CONSTRAINT "_TeamsOnCompetitions_A_fkey" FOREIGN KEY ("A") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamsOnCompetitions" ADD CONSTRAINT "_TeamsOnCompetitions_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayersOnTeams" ADD CONSTRAINT "_PlayersOnTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayersOnTeams" ADD CONSTRAINT "_PlayersOnTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
