import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nModule } from 'nestjs-i18n';
import { ServerLogger } from './services/logger/server-logger';
import { ServicesModule } from './services/services.module';
import { PassportModule } from '@nestjs/passport';
import { DecoratorsModule } from './shared/decorators/decorators.module';
import { ModulesModule } from './modules/modules.module';
import {
  GlobalGuards,
  GlobalFilters,
  GlobalInterceptors,
} from './shared/configs/app.configs';
import { I18nOptions, ThrottlerOptions } from './shared/configs/app-options';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ServicesModule,
    DecoratorsModule,
    PassportModule,
    ModulesModule,
    I18nModule.forRoot(I18nOptions),
    ThrottlerModule.forRoot(ThrottlerOptions),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ServerLogger,
    ...GlobalGuards,
    ...GlobalFilters,
    ...GlobalInterceptors,
  ],
})
export class AppModule {}
