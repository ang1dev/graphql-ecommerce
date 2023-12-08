import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Image')
export class ImageType {
  @Field((type) => ID)
  id: string;
  @Field()
  url: string;
  @Field({ defaultValue: 1000 })
  priority: number;
}
