import { IsNotEmpty, IsString } from 'class-validator'

export class CreateHabitDTO {
  @IsString({ message: 'Habit name must be a string' })
  @IsNotEmpty({ message: 'Habit name must be a non-empty string' })
  name: string

  @IsString({ message: 'Habit description must be a string' })
  @IsNotEmpty({ message: 'Habit description must be a non-empty string' })
  description: string
}
