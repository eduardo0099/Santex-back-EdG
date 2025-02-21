import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Competition } from '../../competititon/models';
import { Player } from '../../player/models';
import { Coach } from '../../coach/models';

@ObjectType()
export class Team {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  externalId!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  tla!: string;

  @Field(() => String)
  shortName!: string;

  @Field(() => String)
  areaName!: string;

  @Field(() => String)
  address!: string;

  @Field(() => [Competition])
  competitions!: Competition[];

  @Field(() => [Player])
  players!: Player[];

  @Field(() => Coach, { nullable: true })
  coach?: Coach;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
