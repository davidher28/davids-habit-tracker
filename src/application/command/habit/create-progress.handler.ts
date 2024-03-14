import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { CreateProgressCommand } from './create-progress.command'
import { HabitNotFoundError } from './habit.not-found.error'
import { HabitId, Progress } from '../../../domain'
import { WearableService } from '../../../domain/shared/wearable.service'

@CommandHandler(CreateProgressCommand)
export class CreateProgressHandler
  implements ICommandHandler<CreateProgressCommand>
{
  constructor(
    @Inject(WearableService) private readonly wearableService: WearableService,
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateProgressCommand): Promise<void> {
    const habitId = HabitId.create(command.habitId)
    const habit = this.habitRepository.findById(habitId)
    if (habit === undefined) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const validated = this.wearableService.execute(habitId)
    const progress = Progress.create(
      command.habitId,
      command.progressDate,
      command.observations,
      validated,
    )

    // Enabling the object to publish events to the events stream
    const habitAggregate = this.publisher.mergeObjectContext(habit)
    habitAggregate.addProgress(progress)
  }
}
