import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class GetHabitsDTO {
  @IsString({ message: 'User Id must be a string' })
  @IsNotEmpty({ message: 'User Id must be a non-empty string' })
  @IsUUID('4', { message: 'User Id must be a valid UUID' })
  userId: string
}
