import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator"
import { UserRole } from "../entities/enum/userRole.enum"

export class UpdateUserDto {

  @IsString()
  @IsNotEmpty()
  name?: string

  @IsString()
  @IsNotEmpty()
  cpf?: string

}
