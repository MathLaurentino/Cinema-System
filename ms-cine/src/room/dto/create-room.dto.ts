import { IsEnum, IsIn, IsNotEmpty, IsNumber } from "class-validator";
import { RoomType } from "../entities/enum/roomType.enum";

export class CreateRoomDto {

  @IsNotEmpty()
  @IsIn(Object.values(RoomType))
  type: RoomType

  @IsNotEmpty()
  @IsNumber()
  number: number

}
