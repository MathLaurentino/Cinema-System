import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Genre } from './entities/genre.entity';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film, Genre]),
    AuthModule
  ],
  controllers: [FilmController, GenreController],
  providers: [FilmService, GenreService],
  exports: [FilmService]
})
export class FilmModule {}
