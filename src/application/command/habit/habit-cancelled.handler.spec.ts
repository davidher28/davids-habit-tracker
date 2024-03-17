import { Habit } from '../../../domain/habit/habit'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { HabitCancelledHandler } from './habit-cancelled.handler'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { InMemoryChallengeRepository } from '../../../infrastructure/challenge/challenge.in-memory.repository'
import { HabitMother } from '../../../../test/habit/habit.mother'
import { HabitCancelledEvent } from '../../../domain/habit/habit-cancelled.event'
import { Challenge, ChallengeStatus } from '../../../domain/challenge/challenge'
import { ChallengeMother } from '../../../../test/challenge/challenge.mother'

describe('HabitCancelledHandler', () => {
  let habit: Habit
  let challenge: Challenge
  let habitRepository: HabitRepository
  let challengeRepository: ChallengeRepository
  let handler: HabitCancelledHandler

  beforeEach(() => {
    habit = HabitMother.create()
    challenge = ChallengeMother.createWithHabitId(habit.idValue)
    habitRepository = new InMemoryHabitRepository()
    challengeRepository = new InMemoryChallengeRepository()
    handler = new HabitCancelledHandler(habitRepository, challengeRepository)
  })

  it('should handle the challenges cancellation', () => {
    // Given
    habitRepository.setHabits([habit])
    challengeRepository.setChallenges([challenge])

    // When
    const event = HabitCancelledEvent.createFromHabitId(habit.id)
    handler.handle(event)

    // Then
    expect(challenge.getStatus).toBe(ChallengeStatus.CANCELLED)
  })
})
