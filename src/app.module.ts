import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { Image } from './image/image.entity';
import { ImageModule } from './image/image.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://[user]:[password]@[cluster].[server].mongodb.net',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Product, Image],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ProductModule,
    ImageModule,
  ],
})
export class AppModule {}
