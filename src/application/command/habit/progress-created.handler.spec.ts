import { HabitRepository } from '../../../domain/habit/habit.repository'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { Habit } from '../../../domain/habit/habit'
import { HabitMother } from '../../../../test/habit/habit.mother'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { InMemoryChallengeRepository } from '../../../infrastructure/challenge/challenge.in-memory.repository'
import { ProgressCreatedEvent } from '../../../domain/habit/progress-created.event'
import { ProgressCreatedHandler } from './progress-created.handler'
import { EventPublisher } from '@nestjs/cqrs'
import { ChallengeMother } from '../../../../test/challenge/challenge.mother'
import { Challenge, ChallengeStatus } from '../../../domain/challenge/challenge'

describe('ProgressCreatedHandler', () => {
  let habit: Habit
  let challenge: Challenge
  let habitRepository: HabitRepository
  let challengeRepository: ChallengeRepository
  let handler: ProgressCreatedHandler
  let publisher: EventPublisher

  beforeEach(() => {
    habit = HabitMother.create()
    challenge = ChallengeMother.createWithHabitId(habit.idValue)
    habitRepository = new InMemoryHabitRepository()
    challengeRepository = new InMemoryChallengeRepository()
    publisher = {
      mergeObjectContext: jest.fn().mockReturnValue(challenge),
    } as any
    handler = new ProgressCreatedHandler(
      habitRepository,
      challengeRepository,
      publisher,
    )
  })

  it('should handle the progress registration', () => {
    // Given
    habitRepository.setHabits([habit])
    challengeRepository.setChallenges([challenge])

    // When
    const event = ProgressCreatedEvent.createFromHabitId(habit.id)
    handler.handle(event)

    // Then
    expect(challenge.getStatus).toBe(ChallengeStatus.COMPLETED)
  })
})
