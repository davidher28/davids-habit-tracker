import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { HabitNotFoundError } from './habit.not-found.error'
import { Challenge, HabitId } from '../../../domain'
import { CreateChallengeCommand } from './create-challenge.command'

@CommandHandler(CreateChallengeCommand)
export class CreateChallengeHandler
  implements ICommandHandler<CreateChallengeCommand>
{
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
  ) {}

  async execute(command: CreateChallengeCommand): Promise<void> {
    const habitId = HabitId.create(command.habitId)
    const habit = this.habitRepository.findById(habitId)
    if (habit === undefined) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const challenge = Challenge.create(
      command.habitId,
      command.description,
      command.habitTimes,
      command.startDate,
      command.endDate,
    )

    habit.addChallenge(challenge)
  }
}
