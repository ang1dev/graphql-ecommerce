import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ImageType } from '../image/image.type';
import { EStatus } from './product.enum';

@ObjectType('Product')
export class ProductType {
  @Field((type) => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  price: number;
  @Field({ defaultValue: EStatus.Active })
  status: EStatus;
  @Field((type) => [ImageType])
  images: string[];
}
