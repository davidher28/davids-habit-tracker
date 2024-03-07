import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class CreateUserDTO {
  @IsString({ message: 'User name must be a string.' })
  @IsNotEmpty({ message: 'User name must be a non-empty string.' })
  userName: string

  @IsEmail({}, { message: 'The email provided is not a valid address.' })
  @IsNotEmpty({ message: 'Email must be a non-empty string.' })
  email: string

  @IsString({ message: 'Full name must be a string.' })
  @IsNotEmpty({ message: 'Full name must be a non-empty string.' })
  fullName: string
}
