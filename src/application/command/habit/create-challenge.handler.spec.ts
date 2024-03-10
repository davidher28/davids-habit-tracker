import { CreateChallengeHandler } from './create-challenge.handler'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { ChallengeRepository } from '../../../domain/habit/challenge.repository'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { InMemoryChallengeRepository } from '../../../infrastructure/habit/challenge.in-memory.repository'
import { CreateChallengeCommand } from './create-challenge.command'
import { Habit } from '../../../domain'
import { HabitMother } from '../../../../test/habit/habit.mother'

describe('CreateChallengeHandler', () => {
  let habit: Habit
  let habitRepository: HabitRepository
  let challengeRepository: ChallengeRepository
  let handler: CreateChallengeHandler

  beforeEach(async () => {
    habit = HabitMother.create()
    habitRepository = new InMemoryHabitRepository()
    challengeRepository = new InMemoryChallengeRepository()
    handler = new CreateChallengeHandler(challengeRepository, habitRepository)
  })

  it('should create a challenge', async () => {
    // Given
    habitRepository.setHabits([habit])
    const habitId = habit.idValue
    const description = 'description'
    const numberOfTimes = 10
    const startDate = new Date('2024-03-01')
    const endDate = new Date('2024-03-31')

    // When
    const command = new CreateChallengeCommand(
      habitId,
      description,
      numberOfTimes,
      startDate,
      endDate,
    )
    await handler.execute(command)

    // Then
    expect(challengeRepository.findByHabitId(habit.id)).toBeTruthy()
  })
})
