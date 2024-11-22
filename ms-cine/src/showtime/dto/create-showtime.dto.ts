import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, Min, ValidateIf } from "class-validator"

export class CreateShowtimeDto {

  @IsBoolean()
  subtitles: boolean

  @ValidateIf((o) => o.subtitles === true)
  @IsString()
  subtitlesLenguage: string

  @IsDateString()
  startTime: Date

  @IsNumber()
  @Min(1)
  filmId: number

  @IsNumber()
  @Min(1)
  roomId: number

}
