import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmModule } from './film/film.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './film/entities/film.entity';
import { Genre } from './film/entities/genre.entity';
import { RoomModule } from './room/room.module';
import { Room } from './room/entities/room.entity';
import { Chair } from './room/entities/chair.entity';
import { ShowtimeModule } from './showtime/showtime.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'sqlite',
      database: 'database.db',
      entities: [Film, Genre, Room, Chair],
      synchronize: true,
    }),
    FilmModule,
    RoomModule,
    ShowtimeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
