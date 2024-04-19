import { IsString, IsNotEmpty, IsUUID } from 'class-validator'

export class CancelHabitDTO {
  @IsString({ message: 'Habit Uuid must be a string.' })
  @IsNotEmpty({ message: 'Habit Uuid must be a non-empty string.' })
  @IsUUID('4', { message: 'Habit Uuid must be a valid UUID.' })
  habitId: string
}
