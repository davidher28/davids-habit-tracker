import { HabitRepository } from '../../../domain/habit/habit.repository'
import { Inject } from '@nestjs/common'
import { EventPublisher } from '../../../domain/shared/event-publisher'
import { CreateChallengeCommand } from './create-challenge.command'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { HabitId } from '../../../domain/habit/habit.id'
import { HabitNotFoundError } from './habit.not-found.error'
import { Challenge } from '../../../domain/challenge/challenge'
import { UUId } from '../../../domain/shared/uuid'

@CommandHandler(CreateChallengeCommand)
export class CreateChallengeHandler
  implements ICommandHandler<CreateChallengeCommand>
{
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateChallengeCommand): Promise<void> {
    const habitId = HabitId.create(command.habitId)
    if (!this.habitRepository.isExistingHabit(habitId)) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const challenge = Challenge.createStarted(
      UUId.generate(),
      habitId,
      command.target,
      command.partner,
      command.project,
      command.cost,
      command.deadline,
      command.users,
    )
    this.eventPublisher.publish(challenge.releaseEvents())
  }
}
