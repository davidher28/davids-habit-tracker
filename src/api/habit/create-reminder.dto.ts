import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { ReminderStatus } from '../../domain/habit/reminder'

export class CreateReminderDTO {
  @IsString({ message: 'Habit Id must be a string.' })
  @IsNotEmpty({ message: 'Habit Id must be a non-empty string.' })
  @IsUUID('4', { message: 'Habit Id must be a valid UUID.' })
  habitId: string

  @IsString({ message: 'Message must be a string.' })
  @IsNotEmpty({ message: 'Message must be a non-empty string.' })
  message: string

  @IsEnum([ReminderStatus.ACTIVE, ReminderStatus.INACTIVE], {
    message:
      'Reminder status must be a valid status. Please, use ACTIVE or INACTIVE.',
  })
  status: string

  @IsString({ message: 'Time must be a string.' })
  @IsNotEmpty({ message: 'Time must be a non-empty string.' })
  time: string
}
