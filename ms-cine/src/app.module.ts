import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmModule } from './film/film.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './film/entities/film.entity';
import { Genre } from './film/entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'sqlite',
      database: 'database.db',
      entities: [Film, Genre],
      synchronize: true,
    }),
    FilmModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
