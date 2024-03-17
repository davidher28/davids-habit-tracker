import { CreateChallengeHandler } from './create-challenge.handler'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { CreateChallengeCommand } from './create-challenge.command'
import { HabitMother } from '../../../../test/habit/habit.mother'
import { HabitNotFoundError } from '../habit/habit.not-found.error'
import { InMemoryChallengeRepository } from '../../../infrastructure/challenge/challenge.in-memory.repository'
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository'
import { Habit } from '../../../domain/habit/habit'

describe('CreateChallengeHandler', () => {
  let habit: Habit
  let habitRepository: HabitRepository
  let challengeRepository: ChallengeRepository
  let handler: CreateChallengeHandler

  beforeEach(async () => {
    habit = HabitMother.create()
    habitRepository = new InMemoryHabitRepository()
    challengeRepository = new InMemoryChallengeRepository()
    handler = new CreateChallengeHandler(habitRepository, challengeRepository)
  })

  it('should create a challenge', async () => {
    // Given
    habitRepository.setHabits([habit])
    const habitId = habit.idValue
    const description = 'description'
    const habitRepetitionTimes = 10
    const startDate = new Date('2024-03-01')
    const endDate = new Date('2024-03-31')

    // When
    const command = new CreateChallengeCommand(
      habitId,
      description,
      habitRepetitionTimes,
      startDate,
      endDate,
    )
    await handler.execute(command)

    // Then
    expect(challengeRepository.findByHabitId(habit.id).length).toBe(1)
  })

  it('should throw an error if the habit does not exist', async () => {
    // Given
    const habitId = habit.idValue
    const description = 'description'
    const habitRepetitionTimes = 10
    const startDate = new Date('2025-12-12')
    const endDate = new Date('2025-12-12')

    // When
    const command = new CreateChallengeCommand(
      habitId,
      description,
      habitRepetitionTimes,
      startDate,
      endDate,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(HabitNotFoundError)
  })
})
