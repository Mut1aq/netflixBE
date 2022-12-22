import mongoose from 'mongoose';
import { Movie } from 'src/modules/movie/entities/movie.entity';

export interface Review {
  reviewText?: string;
  rate: number;
  movieID?: Movie;
}
