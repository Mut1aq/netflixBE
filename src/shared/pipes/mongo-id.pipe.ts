import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { checkNullability } from '../util/check-nullability.util';

@Injectable()
export class MongoDBIDPipe implements PipeTransform {
  transform(mongoDBID: any, metadata: ArgumentMetadata) {
    if (!mongoose.isValidObjectId(mongoDBID) && checkNullability(mongoDBID)) {
      throw new HttpException(
        `common.errors.invalidMongoDBID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return mongoDBID;
  }
}
