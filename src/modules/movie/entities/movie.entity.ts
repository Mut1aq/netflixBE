import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import { Basic } from 'src/shared/entities/basic.entity';
import { Review } from 'src/shared/interfaces/review.interface';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({
  validateBeforeSave: true,
})
export class Movie extends Basic {
  @Prop({
    type: String,
    required: [true, 'Name must be provided'],
    minlength: [1, 'Name must be at least 1 character'],
    maxlength: [100, 'Name must be less than 100 characters'],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Description must be provided'],
    minlength: [1, 'Description must be at least 10 character'],
    maxlength: [100, 'Description must be less than 2200 characters'],
  })
  description: string;

  @Prop({
    type: String,
    required: [true, 'Release Date must be provided'],
    instance: 'Date',
  })
  releaseDate: string;

  @Prop({
    type: String,
  })
  cover: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Movie Author is required'],
  })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  watchedBy: User[];

  @Prop({
    type: [{ reviewText: String, rate: Number }],
  })
  reviews: Review[];
}
export const MovieSchema = SchemaFactory.createForClass(Movie);
