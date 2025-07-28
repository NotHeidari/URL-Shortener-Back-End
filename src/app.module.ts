import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { databaseConfig } from './utils/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CleanupService } from './cleanup.service';
import { ShortUrl } from './entities/short-url.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([ShortUrl]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, CleanupService],
})
export class AppModule {}
