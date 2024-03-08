import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { ProgressRepository } from '../../../domain/habit/progress.repository'
import { CreateProgressCommand } from './create-progress.command'
import { HabitNotFoundError } from './habit.not-found.error'
import {
  HabitId,
  Progress,
  ProgressDate,
  ProgressId,
  ProgressObservations,
  UUId,
} from '../../../domain'

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
    if (!this.habitRepository.isExistingHabit(habitId)) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const uuid = UUId.generate()
    const progressId = ProgressId.create(uuid)
    const progressDate = ProgressDate.create(command.progressDate)
    const progressObservations = ProgressObservations.create(
      command.observations,
    )

    const progress = new Progress(
      progressId,
      habitId,
      progressDate,
      progressObservations,
    )
    this.progressRepository.save(progress)
  }
}
