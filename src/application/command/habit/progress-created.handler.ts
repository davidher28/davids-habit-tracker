import { ProgressCreatedEvent } from '../../../domain/habit/progress-created.event'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { HabitNotFoundError } from './habit.not-found.error'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'

@EventsHandler(ProgressCreatedEvent)
export class ProgressCreatedHandler
  implements IEventHandler<ProgressCreatedEvent>
{
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(ChallengeRepository)
    private readonly challengeRepository: ChallengeRepository,
  ) {}

  handle(event: ProgressCreatedEvent) {
    if (!this.habitRepository.isExistingHabit(event.habitId)) {
      throw HabitNotFoundError.withId(event.habitId.value)
    }

    // TODO: Compute progress
    const challenges = this.challengeRepository.findPendingByHabitId(
      event.habitId,
    )
    challenges.forEach(() => {})
  }
}
