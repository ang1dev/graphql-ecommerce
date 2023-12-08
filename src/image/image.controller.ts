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

import { ImageService } from './image.service';
import { Image } from './image.entity';
import { CreateImageInput, UpdateImageInput } from './image.input';

@Controller('/images')
export class ImageController {
  constructor(private readonly imageservice: ImageService) {}
  @Get()
  @UsePipes(ValidationPipe)
  getImages(): Promise<Image[]> {
    return this.imageservice.getImages();
  }

  @Get(':id')
  getImage(@Param('id') id: string): Promise<Image> {
    return this.imageservice.getImage(id);
  }

  @Post()
  createImage(@Body() image: CreateImageInput): Promise<Image> {
    return this.imageservice.createImage(image);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateImage(
    @Param('id') id: string,
    @Body() image: UpdateImageInput,
  ): Promise<Image> {
    return this.imageservice.updateImage(image);
  }

  @Delete(':id')
  deleteImage(@Param('id') id: string): Promise<String> {
    return this.imageservice.deleteImage(id);
  }
}
