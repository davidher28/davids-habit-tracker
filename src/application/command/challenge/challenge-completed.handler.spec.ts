import { UserMother } from '../../../../test/user/user.mother'
import { User } from '../../../domain/user/user'
import { UserRepository } from '../../../domain/user/user.repository'
import { InMemoryUserRepository } from '../../../infrastructure/user/user.in-memory.repository'
import { ChallengeCompletedHandler } from './challenge-completed.handler'
import { ChallengeCompletedEvent } from '../../../domain/challenge/challenge-completed.event'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { InMemoryChallengeRepository } from '../../../infrastructure/challenge/challenge.in-memory.repository'
import { ChallengeMother } from '../../../../test/challenge/challenge.mother'
import { Challenge } from '../../../domain/challenge/challenge'
import { UserNotFoundError } from '../user/user.not-found.error'
import { ChallengeNotFoundError } from '../../../domain/challenge/challenge.not-found.error'

describe('ChallengeCompletedHandler', () => {
  let user: User
  let challenge: Challenge
  let userRepository: UserRepository
  let challengeRepository: ChallengeRepository
  let handler: ChallengeCompletedHandler

  beforeEach(() => {
    user = UserMother.create()
    challenge = ChallengeMother.create()
    userRepository = new InMemoryUserRepository()
    challengeRepository = new InMemoryChallengeRepository()
    handler = new ChallengeCompletedHandler(userRepository, challengeRepository)
  })

  it('should handle the achievement creation', () => {
    // Given
    userRepository.setUsers([user])
    challengeRepository.setChallenges([challenge])

    // When
    const event = ChallengeCompletedEvent.create(challenge.id, user.id)
    handler.handle(event)

    // Then
    expect(user.getAchievements.length).toBe(1)
  })

  it('should throw an error if the user does not exist', () => {
    // Given
    userRepository.setUsers([])
    challengeRepository.setChallenges([challenge])

    // When
    const event = ChallengeCompletedEvent.create(challenge.id, user.id)

    // Then
    expect(() => handler.handle(event)).toThrow(UserNotFoundError)
  })

  it('should throw an error if the challenge does not exist', () => {
    // Given
    userRepository.setUsers([user])
    challengeRepository.setChallenges([])

    // When
    const event = ChallengeCompletedEvent.create(challenge.id, user.id)

    // Then
    expect(() => handler.handle(event)).toThrow(ChallengeNotFoundError)
  })
})
