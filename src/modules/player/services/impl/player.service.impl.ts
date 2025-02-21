import { plainToInstance } from 'class-transformer';
import { prisma } from '../../../../app';
import { Player } from '../../models';
import { PlayerFilterDto } from '../../dtos';
import { Person } from '../../../../common/interfaces';
import { NotFoundError } from '../../../../common/handlers';
import { PlayerApiData } from '../../interfaces';
import { PlayerService } from '../player.service';
import { Coach } from '../../../coach/models';

export class PlayerServiceImpl implements PlayerService {
  async getPlayers(
    leagueCode: string,
    filter?: PlayerFilterDto,
  ): Promise<Person[]> {
    const competitionExists = await prisma.competition.findUnique({
      where: { code: leagueCode },
    });

    if (!competitionExists) {
      throw new NotFoundError(
        `Competition with code ${leagueCode} does not exist`,
      );
    }

    const whereClause: any = {
      competitions: { some: { code: leagueCode } },
    };
    if (filter?.teamName) {
      whereClause.name = filter.teamName;
    }

    const leagueTeams = await prisma.team.findMany({
      where: whereClause,
      include: { players: true, coach: true },
    });

    const players: Person[] = leagueTeams.flatMap(({ players, coach }) => [
      ...(coach ? [plainToInstance(Coach, coach)] : []),
      ...(plainToInstance(Player, players) ?? []),
    ]);

    return players;
  }

  async upsertPlayer(data: PlayerApiData): Promise<Player> {
    return prisma.player.upsert({
      where: { externalId: data.id },
      update: {
        name: data.name,
        position: data.position,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        nationality: data.nationality,
      },
      create: {
        externalId: data.id,
        name: data.name,
        position: data.position,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        nationality: data.nationality,
      },
    });
  }

  async connectPlayerToTeam(playerId: string, teamId: string): Promise<void> {
    await prisma.team.update({
      where: { id: teamId },
      data: {
        players: {
          connect: { id: playerId },
        },
      },
    });
  }
}
