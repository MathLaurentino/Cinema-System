import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/userRole.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.create(createFilmDto);
  }

  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmService.findOne(+id);
  }

  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.update(+id, updateFilmDto);
  }

  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmService.remove(+id);
  }
}
