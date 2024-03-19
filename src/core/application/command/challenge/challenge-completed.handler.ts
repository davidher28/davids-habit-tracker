import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { UserRepository } from '../../../domain/user/user.repository'
import { ChallengeCompletedEvent } from '../../../domain/challenge/challenge-completed.event'
import { UserNotFoundError } from '../user/user.not-found.error'
import { HabitId } from '../../../domain/habit/habit.id'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { ChallengeNotFoundError } from '../../../domain/challenge/challenge.not-found.error'
import { ChallengeId } from '../../../domain/challenge/challenge.id'

@EventsHandler(ChallengeCompletedEvent)
export class ChallengeCompletedHandler
  implements IEventHandler<ChallengeCompletedEvent>
{
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(ChallengeRepository)
    private readonly challengeRepository: ChallengeRepository,
  ) {}

  handle(event: ChallengeCompletedEvent): void {
    const userId = HabitId.create(event.userId)
    const user = this.userRepository.findById(userId)
    if (user === undefined) {
      throw UserNotFoundError.withId(userId.value)
    }

    const challengeId = ChallengeId.create(event.challengeId)
    const challenge = this.challengeRepository.findById(challengeId)
    if (challenge === undefined) {
      throw ChallengeNotFoundError.withId(challengeId.value)
    }

    user.addAchievement(event.challengeId, new Date())
  }
}
