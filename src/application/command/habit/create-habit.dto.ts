import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateHabitDTO {
  @IsString({ message: 'Habit name must be a string' })
  @IsNotEmpty({ message: 'Habit name must be a non-empty string' })
  name: string

  @IsString({ message: 'Habit description must be a string' })
  @IsNotEmpty({ message: 'Habit description must be a non-empty string' })
  description: string

  @IsString({ message: 'User Id must be a string' })
  @IsNotEmpty({ message: 'User Id must be a non-empty string' })
  @IsUUID('4', { message: 'User Id must be a valid UUID' })
  userId: string
}
