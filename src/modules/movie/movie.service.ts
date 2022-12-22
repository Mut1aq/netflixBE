import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { ReturnMessage } from 'src/shared/interfaces/return-message.interface';
import {
  checkArrayNullability,
  checkNullability,
} from 'src/shared/util/check-nullability.util';
import { cleanObject } from 'src/shared/util/clean-object.util';
import { UserService } from '../user/user.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private movieModel: Model<MovieDocument>,
    private readonly userService: UserService,
  ) {}

  async createMovie(
    createMovieDto: CreateMovieDto,
    userID: mongoose.Schema.Types.ObjectId,
  ): Promise<ReturnMessage> {
    const movie = new this.movieModel(createMovieDto);
    const user = await this.userService.findOneByID(userID);
    user.addedMovies.push(movie._id);
    movie.author = user;
    await user.save();
    await movie.save();
    return {
      message: 'movie.success.create',
      statusCode: 201,
    };
  }
  async createReview(
    createReviewDto: CreateReviewDto,
    movieID: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
  ): Promise<ReturnMessage> {
    const user = await this.userService.findOneByID(userID);
    const movie = await this.findOne(movieID);
    movie.reviews.push(createReviewDto);
    user.reviews.push({ ...createReviewDto, movieID: movie._id });
    user.ratedMovies.push(movie._id);
    movie.rate = this.calculateReviewRate(cleanObject(movie));
    movie.isNew = false;
    user.isNew = false;
    await movie.save();
    await user.save();
    return {
      message: 'movie.success.review',
      statusCode: 201,
    };
  }

  calculateReviewRate(movie: Movie): number {
    if (checkArrayNullability(movie.reviews)) {
      const { reviews } = movie;
      let sumOfRates = 0;
      for (const review of reviews) {
        sumOfRates = sumOfRates + review.rate;
      }
      return sumOfRates / reviews.length;
    }
  }

  async findAll(query: FilterDto) {
    const { skip, limit, orderByDate } = query;

    const orderByDateFilter = !checkNullability(orderByDate)
      ? { _id: orderByDate === 'asc' ? 1 : -1 }
      : ({} as any);

    const orderByRateFilter = !checkNullability(orderByDate)
      ? { rate: orderByDate === 'asc' ? 1 : -1 }
      : ({} as any);

    const movies = await this.movieModel
      .find()
      .populate('watchedBy')
      .populate('author')
      .skip(skip)
      .limit(limit || 5)
      .sort(orderByDateFilter)
      .sort(orderByRateFilter);

    return movies;
  }

  async findOne(movieID: mongoose.Schema.Types.ObjectId): Promise<Movie> {
    const movie = await this.movieModel.findById(movieID);
    emptyDocument(movie, 'movie');
    return movie;
  }

  addToWatchList(movieID: mongoose.Schema.Types.ObjectId) {
    return `This action updates a #${movieID} movie`;
  }

  remove(movieID: mongoose.Schema.Types.ObjectId) {
    return `This action removes a #${movieID} movie`;
  }
}
