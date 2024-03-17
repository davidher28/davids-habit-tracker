import { ProgressCreatedEvent } from '../../../domain/habit/progress-created.event'
import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { HabitNotFoundError } from './habit.not-found.error'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { HabitId } from '../../../domain/habit/habit.id'

@EventsHandler(ProgressCreatedEvent)
export class ProgressCreatedHandler
  implements IEventHandler<ProgressCreatedEvent>
{
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(ChallengeRepository)
    private readonly challengeRepository: ChallengeRepository,
    private readonly publisher: EventPublisher,
  ) {}

  handle(event: ProgressCreatedEvent): void {
    const habitId = HabitId.create(event.habitId)
    const habit = this.habitRepository.findById(habitId)
    if (habit === undefined) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const challenges = this.challengeRepository.findPendingByHabitId(habitId)
    challenges.forEach((challenge) => {
      const challengeRoot = this.publisher.mergeObjectContext(challenge)
      challengeRoot.addProgress(habit.userId)
    })
  }
}
