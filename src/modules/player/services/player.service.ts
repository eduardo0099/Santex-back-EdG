import { Player } from '../models';
import { PlayerFilterDto } from '../dtos';
import { Person } from '../../../common/interfaces';
import { PlayerApiData } from '../interfaces';

export interface PlayerService {
  getPlayers(leagueCode: string, filter?: PlayerFilterDto): Promise<Person[]>;

  upsertPlayer(data: PlayerApiData): Promise<Player>;

  connectPlayerToTeam(playerId: string, teamId: string): Promise<void>;
}
