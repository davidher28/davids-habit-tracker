import {
  IsString,
  IsPositive,
  MaxLength,
  IsDate,
  IsNotEmpty,
  IsUUID,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateChallengeDTO {
  @IsString({ message: 'Habit Uuid must be a string.' })
  @IsNotEmpty({ message: 'Habit Uuid must be a non-empty string.' })
  @IsUUID('4', { message: 'Habit Uuid must be a valid UUID.' })
  habitId: string

  @IsString({ message: 'Description must be a string.' })
  @MaxLength(30, { message: 'Description must be at most 30 characters long.' })
  description: string

  @IsNotEmpty({ message: 'Number of times must be a non-empty number.' })
  @IsPositive({
    message: 'Number of times must be a positive number.',
  })
  habitRepetitionTimes: number

  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date.' })
  startDate: Date

  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date.' })
  endDate: Date
}
