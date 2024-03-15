import { HabitRepository } from '../../../domain/habit/habit.repository'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { Habit } from '../../../domain'
import { HabitMother } from '../../../../test/habit/habit.mother'
import { CreateReminderHandler } from './create-reminder.handler'
import { CreateReminderCommand } from './create-reminder.command'
import { HabitNotFoundError } from './habit.not-found.error'
import { ReminderLimitError } from '../../../domain/habit/reminder.limit.error'
import { ReminderAlreadyExistsError } from '../../../domain/habit/reminder.already-exists.error'
import { ReminderStatus } from '../../../domain/habit/reminder'

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
    const status = ReminderStatus.ACTIVE
    const time = '12:30'

    // When
    const command = new CreateReminderCommand(habitId, message, status, time)
    await handler.execute(command)

    // Then
    expect(habit.getReminders.length).toBe(1)
  })

  it('should throw an error if the habit does not exist', async () => {
    // Given
    const habitId = habit.idValue
    const message = 'message'
    const status = ReminderStatus.ACTIVE
    const time = '12:30'

    // When
    const command = new CreateReminderCommand(habitId, message, status, time)

    // Then
    await expect(handler.execute(command)).rejects.toThrow(HabitNotFoundError)
  })

  it('should throw an error if the number of reminders is greater than 3', async () => {
    // Given
    habitRepository.setHabits([habit])
    const habitId = habit.idValue
    const message = 'message'
    const status = ReminderStatus.ACTIVE

    // When
    habit.addReminder(habitId, message, status, '12:30')
    habit.addReminder(habitId, message, status, '08:30')
    habit.addReminder(habitId, message, status, '18:30')
    const command = new CreateReminderCommand(habitId, message, status, '22:10')

    // Then
    await expect(handler.execute(command)).rejects.toThrow(ReminderLimitError)
  })

  it('should throw an error if the reminder time already exists', async () => {
    // Given
    habitRepository.setHabits([habit])
    const habitId = habit.idValue
    const message = 'message'
    const status = ReminderStatus.ACTIVE
    const time = '12:30'

    // When
    habit.addReminder(habitId, message, status, time)
    const command = new CreateReminderCommand(habitId, message, status, time)

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      ReminderAlreadyExistsError,
    )
  })
})
