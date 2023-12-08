import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Product } from './product.entity';
import { CreateProductInput, UpdateProductInput } from './product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProduct(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }
  async createProduct(input: CreateProductInput): Promise<Product> {
    const { name, price, status, images } = input;

    const product = this.productRepository.create({
      id: uuid(),
      name,
      price,
      status,
      images,
    });
    return this.productRepository.save(product);
  }

  async updateProduct(updateProduct: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.findOneBy({
      id: updateProduct.id!,
    });
    if (updateProduct.name != null) {
      product.name = updateProduct.name;
    }
    if (updateProduct.price != null) {
      product.price = updateProduct.price;
    }
    if (updateProduct.status != null) {
      product.status = updateProduct.status;
    }
    return this.productRepository.save(product);
  }

  async assignImagesToProduct(
    productId: string,
    imageIds: string[],
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: productId });
    product.images = [...product.images, ...imageIds];
    return this.productRepository.save(product);
  }

  async deleteProduct(id: string): Promise<string> {
    const productToDelete = await this.productRepository.findOneBy({ id: id });

    if (!productToDelete) {
      throw new Error('Product not found');
    }

    await this.productRepository.remove(productToDelete);

    return `Product with id: ${id} was deleted`;
  }
}
