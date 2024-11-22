import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Genre } from "./entities/genre.entity";
import { ILike, Repository } from "typeorm";
import { GenreDto } from "./dto/genre.dto";

@Injectable()
export class GenreService {

  @InjectRepository(Genre)
  private readonly genreRepository: Repository<Genre>;


  async create(genreDto: GenreDto): Promise<Genre> {
    const nameExist = await this.genreRepository.findOne({ where: { name: ILike(genreDto.name) } });
    
    if (nameExist) {
      throw new BadRequestException(`Genre '${genreDto.name}' already exist`)
    }
    
    const genre = await this.genreRepository.create({... genreDto})
    
    return this.genreRepository.save(genre);
  }


  async update(id: number, genreDto: GenreDto): Promise<Genre> {
    const genre = await this.genreRepository.preload({ ... genreDto, id })
    
    if (!genre) 
      throw new NotFoundException(`Film ID ${id} not found`);
    
    return this.genreRepository.save(genre);
  }


  async remove(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne({
      where: { id },
      relations: ['films'],
    });
    
    if (!genre) {
      throw new NotFoundException(`Genre ID ${id} not found`);
    }
    if (genre.films && genre.films.length > 0) {
      throw new ConflictException(
        `Cannot delete genre ID ${id} because it is associated with one or more films.`,
      );
    }

    return await this.genreRepository.remove(genre);
  }


  async getAll(): Promise<Genre[]> {
    return this.genreRepository.find()
  }
}