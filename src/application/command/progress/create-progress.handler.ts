import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { ProgressRepository } from '../../../domain/progress/progress.repository'
import { CreateProgressCommand } from './create-progress.command'
import { HabitNotFoundError } from '../../../api/error/habit/habit-not-found.error'
import { HabitId } from '../../../domain'

@CommandHandler(CreateProgressCommand)
export class CreateProgressHandler
  implements ICommandHandler<CreateProgressCommand>
{
  constructor(
    @Inject(ProgressRepository)
    private readonly progressRepository: ProgressRepository,
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
  ) {}

  async execute(command: CreateProgressCommand): Promise<void> {
    const habitId = HabitId.create(command.habitId)
    if (!this.habitRepository.isExistingHabit(habitId.value)) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    // this.progressRepository.save(progress)
  }
}
