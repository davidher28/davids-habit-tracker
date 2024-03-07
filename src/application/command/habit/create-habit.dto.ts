import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { Frequency } from '../../../domain/habit/habit.frequency'

export class CreateHabitDTO {
  @IsString({ message: 'Habit name must be a string' })
  @IsNotEmpty({ message: 'Habit name must be a non-empty string' })
  name: string

  @IsString({ message: 'Habit description must be a string' })
  @IsNotEmpty({ message: 'Habit description must be a non-empty string' })
  description: string

  @IsEnum([Frequency.HOURLY, Frequency.DAILY, Frequency.WEEKLY], {
    message:
      'Habit frequency must be a valid frequency. Please, use HOURLY, DAILY or WEEKLY.',
  })
  frequency: string

  @IsString({ message: 'User Id must be a string' })
  @IsNotEmpty({ message: 'User Id must be a non-empty string' })
  @IsUUID('4', { message: 'User Id must be a valid UUID' })
  userId: string
}
