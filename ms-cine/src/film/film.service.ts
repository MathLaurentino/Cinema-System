import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { ILike, Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class FilmService {

  @InjectRepository(Film)
  private readonly filmRepository: Repository<Film>;

  @InjectRepository(Genre)
  private readonly genreRepository: Repository<Genre>;

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
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


  async findOne(id: number) {
    const film = await this.filmRepository.findOne({ where: { id }, relations: ['genres'] });
    
    if (!film) 
      throw new NotFoundException(`Film ID ${id} not found`);
    
    return film;
  }


  async update(id: number, updateFilmDto: UpdateFilmDto): Promise<Film> {
    let  genres 
    if (updateFilmDto.genres != null) 
      genres = await Promise.all(updateFilmDto.genres.map((name) => this.preloadGenreByName(name)))
    
    const film = await this.filmRepository.preload({
      ... updateFilmDto,
      genres, 
      id
    })
    
    if (!film) 
      throw new NotFoundException(`Film ID ${id} not found`);
    
    return this.filmRepository.save(film);
  }


  async remove(id: number): Promise<void> {
    const film = await this.filmRepository.findOne({ where: { id } });
    
    if (!film) 
      throw new NotFoundException(`Film ID ${id} not found`);
    
    this.filmRepository.remove(film);
  }


  private async preloadGenreByName(name: string): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { name: ILike(name) } });
    
    if (genre) {
      return genre;
    }
    
    return this.genreRepository.create({ name });
  }

}
