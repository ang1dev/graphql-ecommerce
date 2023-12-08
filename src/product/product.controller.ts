import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductInput, UpdateProductInput } from './product.input';
import { Product } from './product.entity';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @UsePipes(ValidationPipe)
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.getProduct(id);
  }

  @Post()
  createProduct(@Body() product: CreateProductInput): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateProduct(
    @Param('id') id: string,
    @Body() product: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.updateProduct(product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<String> {
    return this.productService.deleteProduct(id);
  }
}
