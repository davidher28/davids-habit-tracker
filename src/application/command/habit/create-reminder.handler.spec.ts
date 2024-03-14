import { HabitRepository } from '../../../domain/habit/habit.repository'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { Habit } from '../../../domain'
import { HabitMother } from '../../../../test/habit/habit.mother'
import { CreateReminderHandler } from './create-reminder.handler'
import { CreateReminderCommand } from './create-reminder.command'

describe('CreateReminderHandler', () => {
  let habit: Habit
  let habitRepository: HabitRepository
  let handler: CreateReminderHandler

  beforeEach(async () => {
    habit = HabitMother.create()
    habitRepository = new InMemoryHabitRepository()
    handler = new CreateReminderHandler(habitRepository)
  })

  it('should create a reminder', async () => {
    // Given
    habitRepository.setHabits([habit])
    const habitId = habit.idValue
    const message = 'message'
    const state = 'ACTIVE'
    const time = '12:30'

    // When
    const command = new CreateReminderCommand(habitId, message, state, time)
    await handler.execute(command)

    // Then
    expect(habit.getReminders.length).toBe(1)
  })
})
