import { CompetitionApiData } from '../../modules/competititon/interfaces';
import { CompetitionResponseData } from '../interfaces/football.interface';

export interface FootballApiService {
  fetchCompetitionTeams(leagueCode: string): Promise<CompetitionResponseData>;
  fetchCompetition(leagueCode: string): Promise<CompetitionApiData>;
}
