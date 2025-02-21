import { InputType, Field } from 'type-graphql';

@InputType()
export class PlayerFilterDto {
  @Field(() => String, { nullable: true })
  teamName?: string;
}
