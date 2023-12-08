import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignImagesToProduct {
  @IsUUID()
  @Field((type) => ID)
  productId: string;
  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  imagesIds: string[];
}
