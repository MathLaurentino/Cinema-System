import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class FilmService {

  @InjectRepository(Film)
  private readonly filmRepository: Repository<Film>;

  @InjectRepository(Genre)
  private readonly genreRepository: Repository<Genre>;

  async create(createFilmDto: CreateFilmDto) {
    const genres = await Promise.all(
      createFilmDto.genres.map((name) => this.preloadGenreByName(name)),
    );

    const film = await this.filmRepository.create({
      ...createFilmDto,
      genres
    })

    return this.filmRepository.save(film);
  }

  async findAll(): Promise<Film[]> {
    return await this.filmRepository.find({ relations: ['genres'] })
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }

  private async preloadGenreByName(name: string): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { name } });

    if (genre) {
      return genre;
    }

    return this.genreRepository.create({ name });
  }
}
