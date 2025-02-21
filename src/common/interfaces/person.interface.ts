import { Field, ID, Int, InterfaceType } from 'type-graphql';

@InterfaceType()
export abstract class Person {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  externalId!: number;

  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field(() => Date, { nullable: true })
  dateOfBirth?: Date | null;

  @Field(() => String, { nullable: true })
  nationality?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
