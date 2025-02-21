import { Resolver, Query, Arg } from 'type-graphql';
import { TeamService } from '../services/team.service';
import { teamService } from '../services/instances';
import { Team } from '../../team/models';
import { plainToInstance } from 'class-transformer';

@Resolver()
export class TeamResolver {
  private teamService: TeamService;

  constructor() {
    this.teamService = teamService;
  }

  @Query(() => Team, { nullable: true })
  async team(@Arg('name', () => String) name: string): Promise<Team | null> {
    const team = await this.teamService.getTeamByName(name);
    if (!team) {
      return null;
    }

    return plainToInstance(Team, team);
  }
}
