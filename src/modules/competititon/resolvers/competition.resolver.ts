import { Resolver, Mutation, Arg, ObjectType, Field } from 'type-graphql';
import { plainToInstance } from 'class-transformer';
import { Competition } from '../models';
import { NotFoundError } from '../../../common/handlers';
import { competitionService, CompetitionService } from '../services';
import { coachService, CoachService } from '../../coach/services';
import {
  footballAPIService,
  FootballApiService,
} from '../../../common/services';
import { TeamService, teamService } from '../../team/services';
import { playerService, PlayerService } from '../../player/services';

@ObjectType()
class ImportCompetitionDataResponse {
  @Field(() => String)
  message!: string;
}

@Resolver()
export class CompetitionResolver {
  private coachService: CoachService;
  private teamService: TeamService;
  private playerService: PlayerService;
  private footballApiService: FootballApiService;
  private competitionService: CompetitionService;

  constructor() {
    this.coachService = coachService;
    this.teamService = teamService;
    this.playerService = playerService;
    this.footballApiService = footballAPIService;
    this.competitionService = competitionService;
  }

  @Mutation(() => ImportCompetitionDataResponse)
  async importCompetitionData(
    @Arg('leagueCode', () => String) leagueCode: string,
  ): Promise<ImportCompetitionDataResponse> {
    const data =
      await this.footballApiService.fetchCompetitionTeams(leagueCode);

    const competitionData = data.competition;
    if (!competitionData) {
      throw new NotFoundError(
        `No competition data found for code: ${leagueCode}`,
      );
    }

    const competitionArea =
      await this.footballApiService.fetchCompetition(leagueCode);

    const competition = await this.competitionService.upsertCompetition(
      plainToInstance(Competition, {
        externalId: competitionData.id,
        name: competitionData.name,
        code: competitionData.code,
        areaName: competitionArea.name,
      }),
    );

    for (const teamData of data.teams) {
      const coach = await this.coachService.upsertCoach(teamData.coach);
      const team = await this.teamService.upsertTeam(teamData, coach.id);
      await this.teamService.connectTeamToCompetition(team.id, competition.id);

      if (Array.isArray(teamData.squad)) {
        for (const playerData of teamData.squad) {
          const player = await this.playerService.upsertPlayer(playerData);
          await this.playerService.connectPlayerToTeam(player.id, team.id);
        }
      }
      await this.teamService.connectTeamToCompetition(team.id, competition.id);
    }

    return plainToInstance(ImportCompetitionDataResponse, {
      message: 'Competition data imported successfully',
    });
  }
}
