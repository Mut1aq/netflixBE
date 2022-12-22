import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { checkNullability } from '../util/check-nullability.util';

/**
 * Pipe to determine if the ID follows mongoDB casting for IDS
 */
@Injectable()
export class MongoDBIDPipe implements PipeTransform {
  transform(mongoDBID: any, metadata: ArgumentMetadata) {
    if (!mongoose.isValidObjectId(mongoDBID) && checkNullability(mongoDBID)) {
      throw new HttpException(`Invalid ID`, HttpStatus.BAD_REQUEST);
    }
    return mongoDBID;
  }
}
