import { prisma } from '../../../../app';
import { Team } from '@prisma/client';
import { TeamApiData } from '../../interfaces';
import { TeamService } from '../team.service';

export class TeamServiceImpl implements TeamService {
  async upsertTeam(data: TeamApiData, coachId?: string): Promise<Team> {
    return prisma.team.upsert({
      where: { externalId: data.id },
      update: {
        name: data.name,
        tla: data.tla,
        shortName: data.shortName,
        areaName: data.area?.name,
        address: data.address,
        coachId,
      },
      create: {
        externalId: data.id,
        name: data.name,
        tla: data.tla,
        shortName: data.shortName,
        areaName: data.area.name,
        address: data.address,
        coachId,
      },
    });
  }

  async connectTeamToCompetition(
    teamId: string,
    competitionId: string,
  ): Promise<void> {
    await prisma.competition.update({
      where: { id: competitionId },
      data: {
        teams: {
          connect: { id: teamId },
        },
      },
    });
  }

  async getTeamByName(name: string): Promise<Team | null> {
    return prisma.team.findFirst({
      where: { name },
      include: { coach: true, players: true },
    });
  }
}
