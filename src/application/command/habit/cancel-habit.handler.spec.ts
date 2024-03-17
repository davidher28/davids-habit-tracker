import { HabitRepository } from '../../../domain/habit/habit.repository'
import { CancelHabitHandler } from './cancel-habit.handler'
import { CancelHabitCommand } from './cancel-habit.command'
import { HabitNotFoundError } from './habit.not-found.error'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { EventPublisher } from '@nestjs/cqrs'
import { HabitMother } from '../../../../test/habit/habit.mother'
import { Habit } from '../../../domain/habit/habit'
import { UUId } from '../../../domain/shared/uuid'

describe('CancelHabitHandler', () => {
  let habit: Habit
  let habitRepository: HabitRepository
  let handler: CancelHabitHandler
  let publisher: EventPublisher

  beforeEach(() => {
    habit = HabitMother.create()
    habitRepository = new InMemoryHabitRepository()
    publisher = { mergeObjectContext: jest.fn().mockReturnValue(habit) } as any
    handler = new CancelHabitHandler(habitRepository, publisher)
  })

  it('should throw an error if the habit does not exist', async () => {
    // Given
    const habitId = UUId.generate()

    // When
    const command = new CancelHabitCommand(habitId)

    // Then
    await expect(handler.execute(command)).rejects.toThrow(HabitNotFoundError)
  })
})
