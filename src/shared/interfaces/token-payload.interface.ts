import { Movie } from 'src/modules/movie/entities/movie.entity';
import { Review } from './review.interface';

export interface Payload {
  fullName: string;
  sub: string;
  addedMovies: Movie[];
  watchedMovies: Movie[];
  ratedMovies: Movie[];
  reviews: Review[];
}
