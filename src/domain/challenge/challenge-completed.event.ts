import { IEvent } from '@nestjs/cqrs'
import { UserId } from '../user/user.id'
import { ChallengeId } from './challenge.id'

export class ChallengeCompletedEvent implements IEvent {
  protected constructor(
    public readonly challengeId: string,
    public readonly userId: string,
  ) {}

  public static create(
    challengedId: ChallengeId,
    userId: UserId,
  ): ChallengeCompletedEvent {
    return new ChallengeCompletedEvent(challengedId.value, userId.value)
  }
}
