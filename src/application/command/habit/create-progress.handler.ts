import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { CreateProgressCommand } from './create-progress.command'
import { HabitNotFoundError } from './habit.not-found.error'
import { Habit, HabitId } from '../../../domain'
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
    let habit: Habit = this.habitRepository.findById(habitId)
    if (habit === undefined) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    // Enable events publication
    habit = this.publisher.mergeObjectContext(habit)
    habit.addProgress(
      command.habitId,
      command.progressDate,
      command.observations,
      this.wearableService,
    )
  }
}
