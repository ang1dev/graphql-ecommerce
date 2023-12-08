import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageService } from './image.service';
import { Image } from './image.entity';
import { ImageResolver } from './image.resolver';
import { ImageController } from './image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService, ImageResolver],
  exports: [ImageService],
})
export class ImageModule {}
