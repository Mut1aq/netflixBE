import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { currentDate } from 'src/shared/util/date.util';
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
    if (!user.watchedMovies.includes(movie._id)) {
      throw new HttpException(
        'movie.errors.watchList',
        HttpStatus.UNAUTHORIZED,
      );
    }
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
    const { skip, limit, orderByDate, orderByRate } = query;

    const orderByDateFilter = checkNullability(orderByDate)
      ? { _id: orderByDate }
      : ({} as any);

    const orderByRateFilter = checkNullability(orderByRate)
      ? { rate: orderByRate }
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

  async addToWatchList(
    movieID: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
  ): Promise<ReturnMessage> {
    const user = await this.userService.findOneByID(userID);
    const movie = await this.findOne(movieID);
    user.watchedMovies.push(movie._id);
    movie.watchedBy.push(user._id);

    await user.save();
    await movie.save();
    return {
      message: 'movie.success.addToWatchList',
      statusCode: 201,
    };
  }

  async update(
    movieID: mongoose.Schema.Types.ObjectId,
    updateMovieDto: UpdateMovieDto,
    userID: mongoose.Schema.Types.ObjectId,
  ): Promise<Movie> {
    const user = await this.userService.findOneByID(userID);
    let movie = await this.movieModel.findByIdAndUpdate(
      movieID,
      updateMovieDto,
    );
    emptyDocument(movie, 'movie');
    if (!user.addedMovies.includes(movie._id)) {
      throw new HttpException(
        'movie.errors.updateDelete',
        HttpStatus.UNAUTHORIZED,
      );
    }
    movie.updateDate = currentDate;
    movie.isNew = false;
    await movie.save();
    return movie;
  }

  async remove(
    movieID: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
  ): Promise<ReturnMessage> {
    const user = await this.userService.findOneByID(userID);
    if (!user.addedMovies.includes(movieID as unknown as Movie)) {
      throw new HttpException(
        'movie.errors.updateDelete',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const movie = await this.movieModel.findByIdAndRemove(movieID).exec();
    emptyDocument(movie, 'movie');
    return {
      message: '',
      statusCode: 201,
    };
  }
}
