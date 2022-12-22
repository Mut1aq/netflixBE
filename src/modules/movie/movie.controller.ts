import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import mongoose from 'mongoose';
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { MongoDBIDPipe } from 'src/shared/pipes/mongo-id.pipe';

@ApiTags('movie')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiCreatedResponse({
    status: 201,
    description:
      'The Movie has been successfully created, and the logged In user was attached as the author',
  })
  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto, @Req() req) {
    return this.movieService.createMovie(createMovieDto, req.user.sub);
  }

  @ApiCreatedResponse({
    status: 201,
    description:
      'The Review has been successfully created, and added to the movie',
  })
  @Post(':movieID/review')
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Param('movieID', new MongoDBIDPipe())
    movieID: mongoose.Schema.Types.ObjectId,
    @Req() req,
  ) {
    return this.movieService.createReview(
      createReviewDto,
      movieID,
      req.user.sub,
    );
  }

  @ApiOkResponse({ description: 'Return all movies' })
  @ApiNoContentResponse({ description: 'no movies in the database' })
  @Get()
  findAll(@Query() query: FilterDto) {
    return this.movieService.findAll(query);
  }

  @ApiOkResponse({ description: 'Return a movie by ID' })
  @ApiNoContentResponse({ description: 'no movie in the database' })
  @Get(':movieID')
  findOne(
    @Param('movieID', new MongoDBIDPipe())
    movieID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.movieService.findOne(movieID);
  }

  @Patch(':movieID/watch')
  addToWatchList(
    @Param('movieID', new MongoDBIDPipe())
    movieID: mongoose.Schema.Types.ObjectId,
    @Req() req,
  ) {
    return this.movieService.addToWatchList(movieID, req.user.sub);
  }

  @Put(':movieID')
  update(
    @Param('movieID', new MongoDBIDPipe())
    movieID: mongoose.Schema.Types.ObjectId,
    @Body() updateMovieDto: UpdateMovieDto,
    @Req() req,
  ) {
    return this.movieService.update(movieID, updateMovieDto, req.user.sub);
  }

  @Delete(':movieID')
  remove(
    @Param('movieID') movieID: mongoose.Schema.Types.ObjectId,
    @Req() req,
  ) {
    return this.movieService.remove(movieID, req.user.sub);
  }
}
