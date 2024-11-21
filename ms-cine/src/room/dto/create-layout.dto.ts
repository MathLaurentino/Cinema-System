import { IsInt, IsNotEmpty, IsIn, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ChairType } from '../entities/enum/chairType.enum';

export class CreateChairDto {
  @IsInt()
  @Min(0)
  positionX: number;

  @IsInt()
  @Min(0)
  positionY: number;

  @IsString()
  @IsNotEmpty()
  row: string;

  @IsInt()
  @Min(1)
  number: number;

  @IsNotEmpty()
  @IsIn(Object.values(ChairType))
  type: ChairType;
}

export class CreateLayoutDto {
  @ValidateNested({ each: true })
  @Type(() => CreateChairDto)
  chairs: CreateChairDto[];
}
