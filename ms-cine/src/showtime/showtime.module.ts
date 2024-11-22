import { Module } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ShowtimeController } from './showtime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showtime } from './entities/showtime.entity';
import { RoomModule } from 'src/room/room.module';
import { FilmModule } from 'src/film/film.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Showtime]), 
    RoomModule, 
    FilmModule
  ],
  controllers: [ShowtimeController],
  providers: [ShowtimeService],
})
export class ShowtimeModule {}
