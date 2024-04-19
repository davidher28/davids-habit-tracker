import { v4 as uuidv4 } from 'uuid'
import { InMemoryEventPublisher } from '../../../infrastructure/event-publisher.in-memory'
import { EventPublisher } from '../../../domain/shared/event-publisher'
import { AddUsersToChallengeCommand } from './add-users-to-challenge.command'
import { AddUsersToChallengeHandler } from './add-users-to-challenge.handler'
import { UsersAddedEvent } from '../../../domain/challenge/users-added.event'
import { UUId } from '../../../domain/shared/uuid'
import { HabitId } from '../../../domain/habit/habit.id'
import { Challenge } from '../../../domain/challenge/challenge'

describe('AddUsersToChallengeHandler', () => {
  let eventPublisher: EventPublisher
  let handler: AddUsersToChallengeHandler

  beforeEach(() => {
    eventPublisher = new InMemoryEventPublisher()
    handler = new AddUsersToChallengeHandler(eventPublisher)
  })

  it('should add users to a challenge', async () => {
    // Given
    const challengeId = UUId.generate()
    const initialUsers = [uuidv4()]
    const challenge = Challenge.createStarted(
      challengeId,
      HabitId.create(UUId.generate()),
      10,
      'partner',
      'project',
      3999,
      new Date(),
      initialUsers,
    )
    eventPublisher.publish(challenge.releaseEvents())

    // When
    const addedUsers = [uuidv4(), uuidv4()]
    const command = new AddUsersToChallengeCommand(challengeId, addedUsers)
    await handler.execute(command)

    // Then
    expect(eventPublisher.publishedEvents.length).toBeGreaterThan(0)
    expect(
      eventPublisher.hasPublishedEvent(
        UsersAddedEvent.TYPE,
        command.challengeId,
      ),
    ).toBe(true)
  })

  it('should throw an error if the challenge does not exist', async () => {
    // Given
    const challengeId = UUId.generate()
    const addedUsers = [uuidv4(), uuidv4()]

    // When
    const command = new AddUsersToChallengeCommand(UUId.generate(), addedUsers)

    // Then
    await expect(handler.execute(command)).rejects.toThrow()
    expect(
      eventPublisher.hasPublishedEvent(UsersAddedEvent.TYPE, challengeId),
    ).toBe(false)
  })

  it('should throw an error if the users are already in the challenge', async () => {
    // Given
    const challengeId = UUId.generate()
    const initialUsers = [uuidv4(), uuidv4()]
    const challenge = Challenge.createStarted(
      challengeId,
      HabitId.create(UUId.generate()),
      10,
      'partner',
      'project',
      3999,
      new Date(),
      initialUsers,
    )
    eventPublisher.publish(challenge.releaseEvents())

    // When
    const command = new AddUsersToChallengeCommand(challengeId, initialUsers)

    // Then
    await expect(handler.execute(command)).rejects.toThrow()
    expect(
      eventPublisher.hasPublishedEvent(UsersAddedEvent.TYPE, challengeId),
    ).toBe(false)
  })
})
