import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, MovieModule, UserModule],
  exports: [AuthModule, MovieModule, UserModule],
})
export class ModulesModule {}
