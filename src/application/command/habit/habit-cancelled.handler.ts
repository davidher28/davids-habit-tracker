import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { HabitNotFoundError } from './habit.not-found.error'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { HabitId } from '../../../domain'
import { HabitCancelledEvent } from '../../../domain/habit/habit-cancelled.event'

@EventsHandler(HabitCancelledEvent)
export class HabitCreatedHandler implements IEventHandler<HabitCancelledEvent> {
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(ChallengeRepository)
    private readonly challengeRepository: ChallengeRepository,
  ) {}

  handle(event: HabitCancelledEvent) {
    const habitId = HabitId.create(event.habitId)
    const habit = this.habitRepository.findById(habitId)
    if (habit === undefined) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const challenges = this.challengeRepository.findPendingByHabitId(habitId)
    challenges.forEach((challenge) => {
      challenge.cancel()
    })
  }
}
