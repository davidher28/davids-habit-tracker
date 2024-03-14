import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateReminderDTO {
  @IsString({ message: 'Habit Id must be a string.' })
  @IsNotEmpty({ message: 'Habit Id must be a non-empty string.' })
  @IsUUID('4', { message: 'Habit Id must be a valid UUID.' })
  habitId: string

  @IsString({ message: 'Message must be a string.' })
  @IsNotEmpty({ message: 'Message must be a non-empty string.' })
  message: string

  @IsString({ message: 'State must be a string.' })
  @IsNotEmpty({ message: 'State must be a non-empty string.' })
  state: string

  @IsString({ message: 'Time must be a string.' })
  @IsNotEmpty({ message: 'Time must be a non-empty string.' })
  time: string
}
