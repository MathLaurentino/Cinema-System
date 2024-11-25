import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Genre } from "./entities/genre.entity";
import { ILike, Repository } from "typeorm";
import { GenreDto } from "./dto/genre.dto";
import { Roles } from "src/auth/roles.decorator";
import { UserRole } from "src/auth/userRole.enum";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Injectable()
export class GenreService {

  @InjectRepository(Genre)
  private readonly genreRepository: Repository<Genre>;


  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  async create(genreDto: GenreDto): Promise<Genre> {
    const nameExist = await this.genreRepository.findOne({ where: { name: ILike(genreDto.name) } });
    
    if (nameExist) {
      throw new BadRequestException(`Genre '${genreDto.name}' already exist`)
    }
    
    const genre = await this.genreRepository.create({... genreDto})
    
    return this.genreRepository.save(genre);
  }


  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  async update(id: number, genreDto: GenreDto): Promise<Genre> {
    const genre = await this.genreRepository.preload({ ... genreDto, id })
    
    if (!genre) 
      throw new NotFoundException(`Film ID ${id} not found`);
    
    return this.genreRepository.save(genre);
  }


  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
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