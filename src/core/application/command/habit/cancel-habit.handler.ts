import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { CancelHabitCommand } from './cancel-habit.command'
import { HabitNotFoundError } from './habit.not-found.error'
import { HabitId } from '../../../domain/habit/habit.id'
import { Habit } from '../../../domain/habit/habit'

@CommandHandler(CancelHabitCommand)
export class CancelHabitHandler implements ICommandHandler<CancelHabitCommand> {
  constructor(
    @Inject(HabitRepository)
    private readonly habitRepository: HabitRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CancelHabitCommand): Promise<void> {
    const habitId = HabitId.create(command.habitId)
    const habit: Habit = this.habitRepository.findById(habitId)
    if (habit === undefined) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const habitRoot = this.publisher.mergeObjectContext(habit)
    habitRoot.cancel()
  }
}
