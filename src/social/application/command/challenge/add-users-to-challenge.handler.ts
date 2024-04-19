import { Inject } from '@nestjs/common'
import { EventPublisher } from '../../../domain/shared/event-publisher'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AddUsersToChallengeCommand } from './add-users-to-challenge.command'
import { ChallengeId } from '../../../domain/challenge/challenge-id'
import { ChallengeNotFoundError } from './challenge.not-found.error'
import { Challenge } from '../../../domain/challenge/challenge'

@CommandHandler(AddUsersToChallengeCommand)
export class AddUsersToChallengeHandler
  implements ICommandHandler<AddUsersToChallengeCommand>
{
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: AddUsersToChallengeCommand): Promise<void> {
    const challengeId = ChallengeId.create(command.challengeId)
    const challengeStream = this.eventPublisher.findByAggregateId(challengeId)
    if (challengeStream.length === 0) {
      throw ChallengeNotFoundError.withId(challengeId.value)
    }

    const challenge = new Challenge(challengeStream)
    challenge.addUsers(command.users)
    this.eventPublisher.publish(challenge.releaseEvents())
  }
}
