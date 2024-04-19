import { IsString, IsNotEmpty, IsUUID } from 'class-validator'

export class CancelChallengeDTO {
  @IsString({ message: 'Challenge Uuid must be a string.' })
  @IsNotEmpty({ message: 'Challenge Uuid must be a non-empty string.' })
  @IsUUID('4', { message: 'Challenge Uuid must be a valid UUID.' })
  challengeId: string
}
