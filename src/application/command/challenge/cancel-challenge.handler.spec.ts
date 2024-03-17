import { CancelChallengeHandler } from './cancel-challenge.handler'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { InMemoryChallengeRepository } from '../../../infrastructure/challenge/challenge.in-memory.repository'
import { CancelChallengeCommand } from './cancel-challenge.command'
import { ChallengeNotFoundError } from '../../../domain/challenge/challenge.not-found.error'
import { UUId } from '../../../domain'

describe('CancelChallengeHandler', () => {
  let challengeRepository: ChallengeRepository
  let handler: CancelChallengeHandler

  beforeEach(async () => {
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
})
