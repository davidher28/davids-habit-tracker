import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject, NotFoundException } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { ProgressRepository } from '../../../domain/progress/progress.repository'
import { CreateProgressCommand } from './create-progress.command'

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
    if (this.habitRepository.findById(command.habitId)) {
      throw new NotFoundException('Habit does not exist')
    }
    // this.progressRepository.save(progress)
  }
}
