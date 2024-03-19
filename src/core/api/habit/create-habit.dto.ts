import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator'
import { Frequency } from '../../domain/habit/habit.schedule'

export class CreateHabitDTO {
  @IsString({ message: 'Habit name must be a string.' })
  @IsNotEmpty({ message: 'Habit name must be a non-empty string.' })
  name: string

  @IsString({ message: 'Habit description must be a string.' })
  @IsNotEmpty({ message: 'Habit description must be a non-empty string.' })
  description: string

  @IsEnum([Frequency.HOURLY, Frequency.DAILY, Frequency.WEEKLY], {
    message:
      'Habit frequency must be a valid frequency. Please, use HOURLY, DAILY or WEEKLY.',
  })
  frequency: string

  @IsNotEmpty({ message: 'Habit duration must be a non-empty number.' })
  @IsPositive({
    message: 'Habit duration must be a positive number (seconds).',
  })
  duration: number

  @IsNotEmpty({ message: 'Habit rest time must be a non-empty number.' })
  @IsPositive({
    message: 'Habit rest time must be a positive number (seconds).',
  })
  restTime: number

  @IsString({ message: 'User Id must be a string.' })
  @IsNotEmpty({ message: 'User Id must be a non-empty string.' })
  @IsUUID('4', { message: 'User Id must be a valid UUID.' })
  userId: string

  @IsString({ message: 'Wearable Device Id must be a string.' })
  @IsOptional()
  wearableDeviceId?: string
}
