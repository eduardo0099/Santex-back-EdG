import { Team } from '@prisma/client';
import { TeamApiData } from '../interfaces';

export interface TeamService {
  upsertTeam(data: TeamApiData, coachId?: string): Promise<Team>;

  connectTeamToCompetition(
    teamId: string,
    competitionId: string,
  ): Promise<void>;

  getTeamByName(name: string): Promise<Team | null>;
}
