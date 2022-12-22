import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './entities/movie.entity';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    UserModule,
  ],
  exports: [MovieService, MongooseModule],
})
export class MovieModule {}
