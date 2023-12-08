import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ImageModule } from '../image/image.module';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ImageModule],
  controllers: [ProductController],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
