import { Field, ObjectType } from 'type-graphql';
import { Team } from '../../team/models';
import { Person } from '../../../common/interfaces';

@ObjectType({ implements: Person })
export class Coach extends Person {
  @Field(() => [Team])
  teams?: Team[];
}
