import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateProgressDTO {
  @IsString({ message: 'Habit Id must be a string.' })
  @IsNotEmpty({ message: 'Habit Id must be a non-empty string.' })
  @IsUUID('4', { message: 'Habit Id must be a valid UUID.' })
  habitId: string

  @Type(() => Date)
  @IsDate({ message: 'Progress date must be a valid date.' })
  progressDate: Date

  @IsOptional()
  @IsString({ message: 'Observations must be a string.' })
  @MinLength(10, {
    message: 'Observations must be at least 10 characters long.',
  })
  @MaxLength(200, {
    message: 'Observations must be at most 200 characters long.',
  })
  observations?: string
}
