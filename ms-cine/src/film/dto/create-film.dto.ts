import { ArrayNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateFilmDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
  
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsString()
  language: string;

  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly genres: string[];
  
}
