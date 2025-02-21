import axios from 'axios';
import { RateLimiter } from '../../utils';
import { ENV } from '../../config/env';
import { FootballApiService } from '../football.service';
import { CompetitionApiData } from '../../../modules/competititon/interfaces';
import { CompetitionResponseData } from '../../interfaces/football.interface';

export class FootballApiServiceImpl implements FootballApiService {
  private rateLimiter = new RateLimiter(
    parseInt(`${ENV.FOOTBALL_REQ_PER_MIN}`, 10),
  );

  apiUrl: string = ENV.FOOTBALL_API_URL;

  async fetchCompetitionTeams(
    leagueCode: string,
  ): Promise<CompetitionResponseData> {
    const url = `${this.apiUrl}/competitions/${leagueCode}/teams`;

    const response = await this.rateLimiter.scheduleFnWithRejection(() =>
      axios.get(url, {
        headers: {
          'X-Auth-Token': ENV.FOOTBALL_API_TOKEN,
        },
      }),
    );

    return response.data;
  }

  async fetchCompetition(leagueCode: string): Promise<CompetitionApiData> {
    const url = `${this.apiUrl}/competitions/${leagueCode}`;

    const response = await this.rateLimiter.scheduleFnWithRejection(() =>
      axios.get(url, {
        headers: {
          'X-Auth-Token': ENV.FOOTBALL_API_TOKEN,
        },
      }),
    );

    return response.data;
  }
}
