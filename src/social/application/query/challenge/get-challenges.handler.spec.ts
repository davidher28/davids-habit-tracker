import { GetChallengesHandler } from './get-challenges.handler'
import { ReadModel } from '../../../domain/shared/read-model'
import { InMemoryUserChallengesReadModel } from '../../../infrastructure/challenge/user-challenges.in-memory.read-model'
import { GetChallengesQuery } from './get-challenges.query'
import { Challenge } from '../../../domain/challenge/challenge'
import { HabitId } from '../../../domain/habit/habit.id'
import { UUId } from '../../../domain/shared/uuid'
import { EventPublisher } from '../../../domain/shared/event-publisher'
import { InMemoryEventPublisher } from '../../../infrastructure/shared/event-publisher.in-memory'
import { ChallengeStartedEvent } from '../../../domain/challenge/challenge-started.event'

describe('GetChallengesHandler', () => {
  const eventPublisher: EventPublisher = new InMemoryEventPublisher()
  const userChallenges: ReadModel = new InMemoryUserChallengesReadModel()
  const handler: GetChallengesHandler = new GetChallengesHandler(userChallenges)

  it('should read the challenges of the user', async () => {
    // Given
    const challengeId = UUId.generate()
    const userId = UUId.generate()
    const challenge = Challenge.createStarted(
      challengeId,
      HabitId.create(UUId.generate()),
      10,
      'partner',
      'project',
      3999,
      new Date(),
      [userId],
    )
    eventPublisher.registerHandler(
      userChallenges.update.bind(userChallenges),
      ChallengeStartedEvent.TYPE,
    )
    eventPublisher.publish(challenge.releaseEvents())

    // When
    const query = new GetChallengesQuery(userId)
    const result = await handler.execute(query)

    // Then
    expect(result).toEqual([challengeId])
  })
})
