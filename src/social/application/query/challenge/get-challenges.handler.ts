import { Inject } from '@nestjs/common'
import { EventPublisher } from '../../../domain/shared/event-publisher'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GetChallengesQuery } from './get-challenges.query'

@CommandHandler(GetChallengesQuery)
export class GetChallengesHandler
  implements ICommandHandler<GetChallengesQuery>
{
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetChallengesQuery): Promise<void> {
    // TODO: Implement Use Case Logic
  }
}
