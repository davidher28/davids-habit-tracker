import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  userName: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  fullName: string
}
