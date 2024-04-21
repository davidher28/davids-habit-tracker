import { CreateChallengeCommand } from './create-challenge.command'
import { v4 as uuidv4 } from 'uuid'
import { CreateChallengeHandler } from './create-challenge.handler'
import { InMemoryEventPublisher } from '../../../infrastructure/shared/event-publisher.in-memory'
import { EventPublisher } from '../../../domain/shared/event-publisher'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { InMemoryHabitRepository } from '../../../../core/infrastructure/habit/habit.in-memory.repository'
import { HabitMother } from '../../../../../test/habit/habit.mother'
import { Habit } from '../../../../core/domain/habit/habit'
import { ChallengeStartedEvent } from '../../../domain/challenge/challenge-started.event'
import { HabitNotFoundError } from './habit.not-found.error'
import { ChallengeId } from '../../../domain/challenge/challenge.id'
import { InMemoryHabitChallengesReadModel } from '../../../infrastructure/challenge/habit-challenges.in-memory.read-model'
import { ReadModel } from '../../../domain/shared/read-model'

describe('CreateChallengeHandler', () => {
  let habit: Habit
  let habitRepository: HabitRepository
  let eventPublisher: EventPublisher
  let habitChallenges: ReadModel
  let handler: CreateChallengeHandler

  beforeEach(() => {
    habit = HabitMother.create()
    habitRepository = new InMemoryHabitRepository()
    eventPublisher = new InMemoryEventPublisher()
    habitChallenges = new InMemoryHabitChallengesReadModel()
    handler = new CreateChallengeHandler(
      habitRepository,
      eventPublisher,
      habitChallenges,
    )
  })

  it('should create a challenge', async () => {
    // Given
    habitRepository.setHabits([habit])
    const habitId = habit.idValue
    const challengeId = uuidv4()
    const target = 10
    const partner = 'partner'
    const project = 'project'
    const cost = 100
    const deadline = new Date('2025-12-12')
    const users = [uuidv4(), uuidv4()]

    // When
    const command = new CreateChallengeCommand(
      challengeId,
      habitId,
      target,
      partner,
      project,
      cost,
      deadline,
      users,
    )
    await handler.execute(command)

    // Then
    expect(eventPublisher.publishedEvents.length).toBeGreaterThan(0)
    expect(
      eventPublisher.hasPublishedEvent(
        ChallengeId.create(command.challengeId),
        ChallengeStartedEvent.TYPE,
      ),
    ).toBe(true)
  })

  it('should throw an error if the habit does not exist', async () => {
    // Given
    const challengeId = uuidv4()
    const habitId = habit.idValue
    const target = 10
    const partner = 'partner'
    const project = 'project'
    const cost = 100
    const deadline = new Date('2025-12-12')
    const users = [uuidv4(), uuidv4()]

    // When
    const command = new CreateChallengeCommand(
      challengeId,
      habitId,
      target,
      partner,
      project,
      cost,
      deadline,
      users,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(HabitNotFoundError)
    expect(eventPublisher.publishedEvents).toHaveLength(0)
  })

  it('should throw an error if there are incorrect challenge parameters', async () => {
    // Given
    habitRepository.setHabits([habit])
    const habitId = habit.idValue

    // When
    const command = new CreateChallengeCommand(
      uuidv4(),
      habitId,
      10,
      'partner'.repeat(1000),
      'project',
      -100,
      new Date(),
      [uuidv4(), uuidv4()],
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow()
    expect(eventPublisher.publishedEvents).toHaveLength(0)
  })
})
