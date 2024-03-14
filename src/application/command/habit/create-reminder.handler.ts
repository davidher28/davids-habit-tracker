import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { HabitNotFoundError } from './habit.not-found.error'
import { HabitId, Reminder } from '../../../domain'
import { CreateReminderCommand } from './create-reminder.command'

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

    const reminder = Reminder.create(
      command.habitId,
      command.message,
      command.state,
      command.time,
    )

    habit.addReminder(reminder)
  }
}
