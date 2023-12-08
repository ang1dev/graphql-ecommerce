import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';

import { EStatus } from './product.enum';
@InputType()
export class CreateProductInput {
  @MinLength(1)
  @Field()
  name: string;
  @Field()
  price: number;
  @Field({ defaultValue: EStatus.Active })
  status: EStatus;
  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  images: string[];
}
@InputType()
export class UpdateProductInput {
  @Field()
  id: string;
  @MinLength(1)
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  price: number;
  @Field({ nullable: true })
  status: EStatus;
  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  images: string[];
}
