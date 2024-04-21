import { Inject } from '@nestjs/common'
import { EventPublisher } from '../../../domain/shared/event-publisher'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AddChallengeUsersCommand } from './add-challenge-users.command'
import { ChallengeId } from '../../../domain/challenge/challenge.id'
import { ChallengeNotFoundError } from './challenge.not-found.error'
import { Challenge } from '../../../domain/challenge/challenge'
import { ReadModel } from '../../../domain/shared/read-model'
import { UsersAddedEvent } from '../../../domain/challenge/users-added.event'

@CommandHandler(AddChallengeUsersCommand)
export class AddChallengeUsersHandler
  implements ICommandHandler<AddChallengeUsersCommand>
{
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
    @Inject(ReadModel) private readonly userChallengesReadModel: ReadModel,
  ) {}

  private handleEvent(event: UsersAddedEvent): void {
    this.userChallengesReadModel.handle(event)
  }

  async execute(command: AddChallengeUsersCommand): Promise<void> {
    const challengeId = ChallengeId.create(command.challengeId)
    const challengeStream = this.eventPublisher.findByAggregateId(challengeId)
    if (challengeStream.length === 0) {
      throw ChallengeNotFoundError.withId(challengeId.value)
    }

    const challenge = Challenge.create(challengeStream)
    challenge.addUsers(command.users)

    this.eventPublisher.registerHandler(
      this.handleEvent.bind(this),
      UsersAddedEvent.TYPE,
    )
    this.eventPublisher.publish(challenge.releaseEvents())
  }
}
