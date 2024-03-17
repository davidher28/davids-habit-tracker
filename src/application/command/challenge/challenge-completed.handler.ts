import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { UserRepository } from '../../../domain/user/user.repository'
import { ChallengeCompletedEvent } from '../../../domain/challenge/challenge-completed.event'
import { UserNotFoundError } from '../user/user.not-found.error'
import { HabitId } from '../../../domain/habit/habit.id'

@EventsHandler(ChallengeCompletedEvent)
export class ChallengeCompletedHandler
  implements IEventHandler<ChallengeCompletedEvent>
{
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  handle(event: ChallengeCompletedEvent) {
    const userId = HabitId.create(event.userId)
    const user = this.userRepository.findById(userId)
    if (user === undefined) {
      throw UserNotFoundError.withId(userId.value)
    }

    user.addAchievement(event.challengeId, new Date())
  }
}
