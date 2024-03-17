import { UUId } from '../../../domain'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { CancelHabitHandler } from './cancel-habit.handler'
import { CancelHabitCommand } from './cancel-habit.command'
import { HabitNotFoundError } from './habit.not-found.error'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'

describe('CancelHabitHandler', () => {
  let habitRepository: HabitRepository
  let handler: CancelHabitHandler

  beforeEach(async () => {
    habitRepository = new InMemoryHabitRepository()
    handler = new CancelHabitHandler(habitRepository)
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
