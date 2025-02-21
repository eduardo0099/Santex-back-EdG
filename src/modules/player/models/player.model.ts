import { ObjectType, Field } from 'type-graphql';
import { Person } from '../../../common/interfaces';
import { Team } from '../../team/models';

@ObjectType({ implements: Person })
export class Player extends Person {
  @Field(() => String, { nullable: true })
  position?: string | null;

  @Field(() => [Team])
  teams?: Team[];
}
