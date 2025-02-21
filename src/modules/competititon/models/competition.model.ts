import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Team } from '../../team/models';

@ObjectType()
export class Competition {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  externalId!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  code!: string;

  @Field(() => String)
  areaName!: string;

  @Field(() => [Team])
  teams!: Team[];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
