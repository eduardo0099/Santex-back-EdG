import { Resolver, Query, Arg } from 'type-graphql';
import { PlayerFilterDto } from '../dtos';
import { Person } from '../../../common/interfaces';
import { PlayerService } from '../services/player.service';
import { playerService } from '../services/instances';
import { Team } from '../../team/models';

@Resolver()
export class PlayerResolver {
  private playerService: PlayerService;

  constructor() {
    this.playerService = playerService;
  }

  @Query(() => [Person])
  async players(
    @Arg('leagueCode', () => String) leagueCode: string,
    @Arg('filter', () => PlayerFilterDto, { nullable: true })
    filter?: PlayerFilterDto,
  ): Promise<Person[]> {
    return this.playerService.getPlayers(leagueCode, filter);
  }
}
