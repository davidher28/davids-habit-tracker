import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { Challenge, HabitId } from '../../../domain'
import { CancelChallengeCommand } from './cancel-challenge.command'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { ChallengeNotFoundError } from '../../../domain/challenge/challenge.not-found.error'

@CommandHandler(CancelChallengeCommand)
export class CancelChallengeHandler
  implements ICommandHandler<CancelChallengeCommand>
{
  constructor(
    @Inject(ChallengeRepository)
    private readonly challengeRepository: ChallengeRepository,
  ) {}

  async execute(command: CancelChallengeCommand): Promise<void> {
    const challengeId = HabitId.create(command.challengeId)
    const challenge: Challenge = this.challengeRepository.findById(challengeId)
    if (challenge === undefined) {
      throw ChallengeNotFoundError.withId(challengeId.value)
    }

    challenge.cancel()
  }
}
