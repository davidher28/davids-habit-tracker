import { CancelChallengeHandler } from './cancel-challenge.handler'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { InMemoryChallengeRepository } from '../../../infrastructure/challenge/challenge.in-memory.repository'
import { CancelChallengeCommand } from './cancel-challenge.command'
import { ChallengeNotFoundError } from '../../../domain/challenge/challenge.not-found.error'
import { ChallengeMother } from '../../../../test/challenge/challenge.mother'
import { Challenge, ChallengeStatus } from '../../../domain/challenge/challenge'
import { ChallengeUnableToCancelError } from '../../../domain/challenge/challenge.unable-to-cancel.error'
import { UUId } from '../../../domain/shared/uuid'

describe('CancelChallengeHandler', () => {
  let challenge: Challenge
  let challengeRepository: ChallengeRepository
  let handler: CancelChallengeHandler

  beforeEach(async () => {
    challenge = ChallengeMother.create()
    challengeRepository = new InMemoryChallengeRepository()
    handler = new CancelChallengeHandler(challengeRepository)
  })

  it('should throw an error if the challenge does not exist', async () => {
    // Given
    const challengeId = UUId.generate()

    // When
    const command = new CancelChallengeCommand(challengeId)

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      ChallengeNotFoundError,
    )
  })

  it.each([[ChallengeStatus.COMPLETED], [ChallengeStatus.CANCELLED]])(
    'should throw an error if the challenge is in a non-cancellable status (%s)',
    async (status: ChallengeStatus) => {
      // Given
      challenge.modifyStatus(status)
      challengeRepository.setChallenges([challenge])

      // When
      const command = new CancelChallengeCommand(challenge.idValue)

      // Then
      await expect(handler.execute(command)).rejects.toThrow(
        ChallengeUnableToCancelError,
      )
    },
  )
})
