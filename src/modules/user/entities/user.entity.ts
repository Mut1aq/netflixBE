import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import { Movie } from 'src/modules/movie/entities/movie.entity';
import { Basic } from 'src/shared/entities/basic.entity';
import { Review } from 'src/shared/interfaces/review.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({
  validateBeforeSave: true,
})
export class User extends Basic {
  @Prop({
    type: String,
    minlength: [2, 'Full name must be more than 2 characters'],
    trim: true,
  })
  fullName: string;

  @Prop({
    type: Number,
    min: [18, 'Age must be older than 18'],
    required: [true, 'Age must be provided'],
    max: [100, 'Are you a time lord?'],
  })
  age: number;

  @Prop({
    type: String,
    minlength: [5, 'Email must be more than 5 characters'],
    lowercase: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Password must be provided'],
  })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  watchedMovies: Movie[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  addedMovies: Movie[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  ratedMovies: Movie[];

  @Prop({
    type: [
      {
        reviewText: String,
        rate: Number,
        movieID: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
      },
    ],
  })
  reviews: Review[];
}
export const UserSchema = SchemaFactory.createForClass(User);
