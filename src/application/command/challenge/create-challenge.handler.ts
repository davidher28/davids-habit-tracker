import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { HabitNotFoundError } from '../habit/habit.not-found.error'
import { CreateChallengeCommand } from './create-challenge.command'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { HabitId } from '../../../domain/habit/habit.id'
import { Challenge } from '../../../domain/challenge/challenge'

@CommandHandler(CreateChallengeCommand)
export class CreateChallengeHandler
  implements ICommandHandler<CreateChallengeCommand>
{
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(ChallengeRepository)
    private readonly challengeRepository: ChallengeRepository,
  ) {}

  async execute(command: CreateChallengeCommand): Promise<void> {
    const habitId = HabitId.create(command.habitId)
    if (!this.habitRepository.isExistingHabit(habitId)) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const challenge = Challenge.create(
      command.habitId,
      command.description,
      command.habitRepetitionTimes,
      command.startDate,
      command.endDate,
    )
    this.challengeRepository.save(challenge)
  }
}
