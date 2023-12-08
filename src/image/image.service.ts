import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Image } from './image.entity';
import { CreateImageInput, UpdateImageInput } from './image.input';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private imageRepository: MongoRepository<Image>,
  ) {}

  async getImages(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  async getImage(id: string): Promise<Image> {
    return this.imageRepository.findOneBy({ id });
  }

  async createImage(input: CreateImageInput): Promise<Image> {
    const { url, priority } = input;
    const image = this.imageRepository.create({
      id: uuid(),
      url,
      priority,
    });
    return this.imageRepository.save(image);
  }

  async updateImage(updateImage: UpdateImageInput): Promise<Image> {
    const image = await this.imageRepository.findOneBy({
      id: updateImage.id!,
    });
    if (updateImage.url != null) {
      image.url = updateImage.url;
    }
    if (updateImage.priority != null) {
      image.priority = updateImage.priority;
    }

    return this.imageRepository.save(image);
  }

  async getManyImages(imageIds: string[]): Promise<Image[]> {
    return this.imageRepository.find({
      where: {
        id: { $in: imageIds },
      },
    });
  }

  async deleteImage(id: string): Promise<string> {
    const imageToDelete = await this.imageRepository.findOneBy({ id: id });

    if (!imageToDelete) {
      throw new Error('Image not found');
    }

    await this.imageRepository.remove(imageToDelete);

    return `Image with id: ${id} was deleted`;
  }
}
