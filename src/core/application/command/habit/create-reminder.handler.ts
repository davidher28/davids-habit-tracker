import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { HabitNotFoundError } from './habit.not-found.error'
import { CreateReminderCommand } from './create-reminder.command'
import { ReminderStatus } from '../../../domain/habit/reminder'
import { HabitId } from '../../../domain/habit/habit.id'

@CommandHandler(CreateReminderCommand)
export class CreateReminderHandler
  implements ICommandHandler<CreateReminderCommand>
{
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
  ) {}

  async execute(command: CreateReminderCommand): Promise<void> {
    const habitId = HabitId.create(command.habitId)
    const habit = this.habitRepository.findById(habitId)
    if (habit === undefined) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    habit.addReminder(
      command.habitId,
      command.message,
      command.status as ReminderStatus,
      command.time,
    )
  }
}
