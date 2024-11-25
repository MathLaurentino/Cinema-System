import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator"
import { UserRole } from "../entities/enum/userRole.enum"

export class SignUpDto {

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  cpf: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @IsIn(Object.values(UserRole))
  role: UserRole

}
