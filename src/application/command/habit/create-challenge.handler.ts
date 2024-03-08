import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { HabitNotFoundError } from './habit.not-found.error'
import { Challenge, ChallengeId, HabitId, UUId } from '../../../domain'
import { CreateChallengeCommand } from './create-challenge.command'
import { ChallengeRepository } from '../../../domain/habit/challenge.repository'

@CommandHandler(CreateChallengeCommand)
export class CreateChallengeHandler
  implements ICommandHandler<CreateChallengeCommand>
{
  constructor(
    @Inject(ChallengeRepository)
    private readonly challengeRepository: ChallengeRepository,
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
  ) {}

  async execute(command: CreateChallengeCommand): Promise<void> {
    const habitId = HabitId.create(command.habitId)
    if (!this.habitRepository.isExistingHabit(habitId)) {
      throw HabitNotFoundError.withId(habitId.value)
    }

    const uuid = UUId.generate()
    const challengeId = ChallengeId.create(uuid)

    const challenge = new Challenge(
      challengeId,
      habitId,
      command.numberOfTimes,
      command.startDate,
      command.endDate,
    )
    this.challengeRepository.save(challenge)
  }
}
