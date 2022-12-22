import mongoose from 'mongoose';

export interface Review {
  reviewText?: string;
  rate: number;
  movieID?: mongoose.Schema.Types.ObjectId;
}
