import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImageService } from './image.service';
import { CreateImageInput, UpdateImageInput } from './image.input';
import { ImageType } from './image.type';

@Resolver((of) => ImageType)
export class ImageResolver {
  constructor(private imageService: ImageService) {}

  @Query(() => ImageType)
  image(@Args('id') id: string) {
    return this.imageService.getImage(id);
  }

  @Query(() => [ImageType])
  images() {
    return this.imageService.getImages();
  }
  @Mutation(() => ImageType)
  async createImage(@Args('input') input: CreateImageInput) {
    return this.imageService.createImage(input);
  }
  @Mutation(() => ImageType)
  async updateImage(@Args('input') input: UpdateImageInput) {
    return this.imageService.updateImage(input);
  }

  @Mutation(() => String)
  async deleteImage(@Args('id') id: string) {
    return this.imageService.deleteImage(id);
  }
}
