import { Inject } from '@nestjs/common'
import { EventPublisher } from '../../../domain/shared/event-publisher'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { LogChallengeProgressCommand } from './log-challenge-progress.command'
import { ReadModel } from '../../../domain/shared/read-model'
import { ChallengeNotFoundError } from './challenge.not-found.error'
import { HabitId } from '../../../domain/habit/habit.id'
import { ChallengeId } from '../../../domain/challenge/challenge.id'
import { Challenge } from '../../../domain/challenge/challenge'

@CommandHandler(LogChallengeProgressCommand)
export class LogChallengeProgressHandler
  implements ICommandHandler<LogChallengeProgressCommand>
{
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
    @Inject(ReadModel) private readonly habitChallengesReadModel: ReadModel,
  ) {}

  async execute(command: LogChallengeProgressCommand): Promise<void> {
    const habitId = HabitId.create(command.habitId)
    const challengeIds = this.habitChallengesReadModel.handle(habitId)
    if (challengeIds.length === 0) {
      throw ChallengeNotFoundError.withMessage(
        'No challenges found for habit with id ' + habitId.value,
      )
    }

    challengeIds.forEach((challengeIdValue) => {
      const challengeId = ChallengeId.create(challengeIdValue)
      const challengeStream = this.eventPublisher.findByAggregateId(challengeId)
      if (challengeStream.length === 0) {
        throw ChallengeNotFoundError.withId(challengeId.value)
      }

      const challenge = Challenge.create(challengeStream)
      challenge.logProgress(command.progress)

      this.eventPublisher.publish(challenge.releaseEvents())
    })
  }
}
