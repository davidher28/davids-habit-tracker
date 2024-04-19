import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class GetHabitsDTO {
  @IsString({ message: 'User Uuid must be a string.' })
  @IsNotEmpty({ message: 'User Uuid must be a non-empty string.' })
  @IsUUID('4', { message: 'User Uuid must be a valid UUID.' })
  userId: string
}
