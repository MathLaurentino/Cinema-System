import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { GenreDto } from "./dto/genre.dto";

@Controller('Genres')
export class GenreController {

  constructor(private readonly genreService: GenreService){}

  @Post()
  create(@Body() createGenre: GenreDto) {
    return this.genreService.create(createGenre);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() createGenre: GenreDto) {
    return this.genreService.update(id, createGenre);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id') id: number)  {
    return this.genreService.remove(id);
  }

  @Get()
  getAll() {
    return this.genreService.getAll();
  }

}