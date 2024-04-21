import { InMemoryEventPublisher } from '../../../infrastructure/shared/event-publisher.in-memory'
import { EventPublisher } from '../../../domain/shared/event-publisher'
import { UUId } from '../../../domain/shared/uuid'
import { HabitId } from '../../../domain/habit/habit.id'
import { Challenge } from '../../../domain/challenge/challenge'
import { InMemoryHabitChallengesReadModel } from '../../../infrastructure/challenge/habit-challenges.in-memory.read-model'
import { ReadModel } from '../../../domain/shared/read-model'
import { LogChallengeProgressCommand } from './log-challenge-progress.command'
import { LogChallengeProgressHandler } from './log-challenge-progress.handler'
import { ChallengeStartedEvent } from '../../../domain/challenge/challenge-started.event'
import { ChallengeId } from '../../../domain/challenge/challenge.id'

describe('LogChallengeProgressHandler', () => {
  let eventPublisher: EventPublisher
  let habitChallenges: ReadModel
  let handler: LogChallengeProgressHandler

  beforeEach(() => {
    eventPublisher = new InMemoryEventPublisher()
    habitChallenges = new InMemoryHabitChallengesReadModel()
    handler = new LogChallengeProgressHandler(eventPublisher, habitChallenges)
  })

  it('should log progress to multiple challenges', async () => {
    // Given
    const habitId = UUId.generate()
    const initialUsers = [UUId.generate()]
    const firstChallenge = Challenge.createStarted(
      UUId.generate(),
      HabitId.create(habitId),
      4,
      'partner',
      'project',
      3999,
      new Date(new Date().getTime() + 1000),
      initialUsers,
    )
    const secondChallenge = Challenge.createStarted(
      UUId.generate(),
      HabitId.create(habitId),
      2,
      'partner',
      'project',
      3999,
      new Date(new Date().getTime() + 1000),
      initialUsers,
    )
    eventPublisher.registerHandler(
      habitChallenges.update.bind(habitChallenges),
      ChallengeStartedEvent.TYPE,
    )
    eventPublisher.publish(firstChallenge.releaseEvents())
    eventPublisher.publish(secondChallenge.releaseEvents())

    // When
    const command = new LogChallengeProgressCommand(habitId, UUId.generate(), 2)
    await handler.execute(command)

    // Then
    const challengeIds = habitChallenges.handle(HabitId.create(habitId))
    expect(challengeIds).toHaveLength(2)

    // First Challenge
    const challengeId1 = ChallengeId.create(challengeIds[0])
    const challengeStream1 = eventPublisher.findByAggregateId(challengeId1)
    const updatedChallenge1 = Challenge.create(challengeStream1)
    expect(updatedChallenge1.isCompleted()).toBe(false) // Not completed yet

    // Second Challenge
    const challengeId2 = ChallengeId.create(challengeIds[1])
    const challengeStream2 = eventPublisher.findByAggregateId(challengeId2)
    const updatedChallenge2 = Challenge.create(challengeStream2)
    expect(updatedChallenge2.isCompleted()).toBe(true) // Completed
  })

  it('should log progress to a challenge and complete it', async () => {
    // Given
    const habitId = UUId.generate()
    const initialUsers = [UUId.generate()]
    const challenge = Challenge.createStarted(
      UUId.generate(),
      HabitId.create(habitId),
      4,
      'partner',
      'project',
      3999,
      new Date(new Date().getTime() + 1000),
      initialUsers,
    )
    eventPublisher.registerHandler(
      habitChallenges.update.bind(habitChallenges),
      ChallengeStartedEvent.TYPE,
    )
    eventPublisher.publish(challenge.releaseEvents())

    // When
    const firstCommand = new LogChallengeProgressCommand(
      habitId,
      UUId.generate(),
      2,
    )
    await handler.execute(firstCommand)
    const secondCommand = new LogChallengeProgressCommand(
      habitId,
      UUId.generate(),
      2,
    )
    await handler.execute(secondCommand)

    // Then
    const challengeIds = habitChallenges.handle(HabitId.create(habitId))
    expect(challengeIds).toHaveLength(1)

    const challengeId = ChallengeId.create(challengeIds[0])
    const challengeStream = eventPublisher.findByAggregateId(challengeId)
    const updatedChallenge = Challenge.create(challengeStream)
    expect(updatedChallenge.isCompleted()).toBe(true) // Completed
  })
})
