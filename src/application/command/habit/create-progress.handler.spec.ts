import { CreateProgressHandler } from './create-progress.handler'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { CreateProgressCommand } from './create-progress.command'
import { HabitNotFoundError } from './habit.not-found.error'
import { HabitMother } from '../../../../test/habit/habit.mother'
import { EventPublisher } from '@nestjs/cqrs'
import { UserWearableService } from '../../../infrastructure/user/user.wearable.service'
import { WearableService } from '../../../domain/shared/wearable.service'
import { InvalidProgressDateError } from '../../../domain/habit/invalid-progress.date'
import { InvalidProgressObservationsError } from '../../../domain/habit/invalid-progress.observations'
import { Habit } from '../../../domain/habit/habit'

describe('CreateProgressHandler', () => {
  let habit: Habit
  let progressDate: Date
  let observations: string
  let handler: CreateProgressHandler
  let wearableService: WearableService
  let habitRepository: HabitRepository
  let publisher: EventPublisher

  beforeEach(() => {
    habit = HabitMother.create()
    progressDate = new Date('2024-03-07')
    observations = 'Observations'
    wearableService = new UserWearableService()
    habitRepository = new InMemoryHabitRepository()
    publisher = { mergeObjectContext: jest.fn().mockReturnValue(habit) } as any
    handler = new CreateProgressHandler(
      wearableService,
      habitRepository,
      publisher,
    )
  })

  it('should create the progress', async () => {
    // Given
    habitRepository.setHabits([habit])
    const habitId = habit.idValue

    // When
    const command = new CreateProgressCommand(
      habitId,
      progressDate,
      observations,
    )
    await handler.execute(command)

    // Then
    expect(habit.getProgress.length).toBe(1)
    expect(publisher.mergeObjectContext).toHaveBeenCalled()
  })

  it('should throw an error if the habit does not exist', async () => {
    // Given
    const habitId = habit.idValue

    // When
    const command = new CreateProgressCommand(
      habitId,
      progressDate,
      observations,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(HabitNotFoundError)
  })

  it('should throw an error if the progress date is in the future', async () => {
    // Given
    habitRepository.setHabits([habit])
    const futureDate = new Date('2050-03-07')
    const habitId = habit.idValue

    // When
    const command = new CreateProgressCommand(habitId, futureDate)

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      InvalidProgressDateError,
    )
  })

  it('should throw an error if the observations are less than 10 characters', async () => {
    // Given
    habitRepository.setHabits([habit])
    const shortObservations = 'Short'
    const habitId = habit.idValue

    // When
    const command = new CreateProgressCommand(
      habitId,
      progressDate,
      shortObservations,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      InvalidProgressObservationsError,
    )
  })

  it('should throw an error if the observations are more than 200 characters', async () => {
    // Given
    habitRepository.setHabits([habit])
    const longObservations = 'A'.repeat(201)
    const habitId = habit.idValue

    // When
    const command = new CreateProgressCommand(
      habitId,
      progressDate,
      longObservations,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      InvalidProgressObservationsError,
    )
  })
})
