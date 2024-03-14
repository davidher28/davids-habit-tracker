import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
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
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateProgressCommand): Promise<void> {
    const habitId = HabitId.create(command.habitId)
    const habit = this.habitRepository.findById(habitId)
    if (habit === undefined) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const uuid = UUId.generate()
    const progressId = ProgressId.create(uuid)
    const progressDate = ProgressDate.create(command.progressDate)
    const progressObservations = ProgressObservations.create(
      command.observations,
    )
    const progress = Progress.create(
      progressId,
      habitId,
      progressDate,
      progressObservations,
    )

    // Enabling the object to publish events to the events stream
    const habitAggregate = this.publisher.mergeObjectContext(habit)
    habitAggregate.addProgress(progress)
  }
}
