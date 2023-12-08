import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field({ nullable: true })
  url: string;
  @Field({ nullable: true })
  priority: number;
}

@InputType()
export class UpdateImageInput {
  @Field()
  id: string;
  @Field({ nullable: true })
  url: string;
  @Field({ nullable: true })
  priority: number;
}
