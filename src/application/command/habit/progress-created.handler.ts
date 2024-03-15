import { ProgressCreatedEvent } from '../../../domain/habit/progress-created.event'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { HabitNotFoundError } from './habit.not-found.error'
import { Habit } from '../../../domain'

@EventsHandler(ProgressCreatedEvent)
export class ProgressCreatedHandler
  implements IEventHandler<ProgressCreatedEvent>
{
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
  ) {}

  handle(event: ProgressCreatedEvent) {
    const habit: Habit = this.habitRepository.findById(event.habitId)
    if (habit === undefined) {
      throw HabitNotFoundError.withId(event.habitId.value)
    }

    habit.registerProgress()
  }
}
