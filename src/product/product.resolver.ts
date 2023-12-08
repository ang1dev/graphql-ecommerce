import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductType } from './product.type';
import { ProductService } from './product.service';
import { CreateProductInput, UpdateProductInput } from './product.input';
import { AssignImagesToProduct } from './assign-images-to-product.input';
import { Product } from './product.entity';
import { ImageService } from '../image/image.service';

@Resolver((of) => ProductType)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private imageService: ImageService,
  ) {}
  @Query(() => ProductType)
  product(@Args('id') id: string) {
    return this.productService.getProduct(id);
  }
  @Query(() => [ProductType])
  products() {
    return this.productService.getProducts();
  }
  @Mutation(() => ProductType)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.createProduct(input);
  }

  @Mutation(() => ProductType)
  async updateProduct(@Args('input') input: UpdateProductInput) {
    return this.productService.updateProduct(input);
  }

  @Mutation(() => ProductType)
  assignImagesToProduct(@Args('input') input: AssignImagesToProduct) {
    const { productId, imagesIds } = input;
    return this.productService.assignImagesToProduct(productId, imagesIds);
  }

  @ResolveField()
  async images(@Parent() product: Product) {
    return this.imageService.getManyImages(product.images);
  }

  @Mutation(() => String)
  async deleteProduct(@Args('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
