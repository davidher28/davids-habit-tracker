import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GetChallengesQuery } from './get-challenges.query'
import { ReadModel } from '../../../domain/shared/read-model'
import { ChallengeNotFoundError } from '../../command/challenge/challenge.not-found.error'
import { UserId } from '../../../domain/user/user.id'

@CommandHandler(GetChallengesQuery)
export class GetChallengesHandler
  implements ICommandHandler<GetChallengesQuery>
{
  constructor(
    @Inject(ReadModel) private readonly userChallengesReadModel: ReadModel,
  ) {}

  async execute(query: GetChallengesQuery): Promise<string[]> {
    const userId = UserId.create(query.userId)
    const challengeIds = this.userChallengesReadModel.handle(userId)
    if (challengeIds.length === 0) {
      throw ChallengeNotFoundError.withMessage(
        'No challenges found for user with id ' + userId.toString(),
      )
    }

    return challengeIds
  }
}
