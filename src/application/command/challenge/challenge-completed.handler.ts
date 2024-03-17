import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitId } from '../../../domain'
import { UserRepository } from '../../../domain/user/user.repository'
import { ChallengeCompletedEvent } from '../../../domain/challenge/challenge-completed.event'
import { UserNotFoundError } from '../user/user.not-found.error'

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

    // TODO: Create achievement
  }
}
