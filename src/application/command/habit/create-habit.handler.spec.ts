import { CreateHabitCommand } from './create-habit.command'
import { CreateHabitHandler } from './create-habit.handler'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { UserRepository } from '../../../domain/user/user.repository'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { InMemoryUserRepository } from '../../../infrastructure/user/user.in-memory.repository'
import { HabitMother } from '../../../../test/habit/habit.mother'
import { UserMother } from '../../../../test/user/user.mother'
import { HabitAlreadyExistsError } from './habit.already-exists.error'
import { UserNotFoundError } from '../user/user.not-found.error'
import { Frequency } from '../../../domain/habit/habit.schedule'
import { User } from '../../../domain/user/user'
import { Habit } from '../../../domain/habit/habit'
import { InvalidHabitDescriptionError } from '../../../domain/habit/invalid-habit.description'
import { InvalidHabitNameError } from '../../../domain/habit/invalid-habit.name'
import { InvalidHabitScheduleError } from '../../../domain/habit/invalid-habit.schedule'

describe('CreateHabitHandler', () => {
  let user: User
  let habit: Habit
  let habitRepository: HabitRepository
  let userRepository: UserRepository
  let handler: CreateHabitHandler

  beforeEach(() => {
    user = UserMother.create()
    habit = HabitMother.create()
    habitRepository = new InMemoryHabitRepository()
    userRepository = new InMemoryUserRepository()
    handler = new CreateHabitHandler(habitRepository, userRepository)
  })

  it('should create a habit', async () => {
    // Given
    userRepository.setUsers([user])
    const habitName = habit.nameValue
    const habitDescription = habit.descriptionValue
    const habitSchedule = habit.scheduleValue
    const userId = user.idValue

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      habitSchedule.frequency,
      habitSchedule.duration,
      habitSchedule.restTime,
      userId,
    )
    await handler.execute(command)

    // Then
    expect(habitRepository.findByName(habit.name)).toBeTruthy()
  })

  it('should create a habit with wearable id associated', async () => {
    // Given
    userRepository.setUsers([user])
    const habitName = habit.nameValue
    const habitDescription = habit.descriptionValue
    const habitSchedule = habit.scheduleValue
    const userId = user.idValue
    const wearableDeviceId = '0x12356789'

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      habitSchedule.frequency,
      habitSchedule.duration,
      habitSchedule.restTime,
      userId,
      wearableDeviceId,
    )
    await handler.execute(command)

    // Then
    const newHabit = habitRepository.findByName(habit.name)
    expect(newHabit).toBeTruthy()
    expect(newHabit.wearableDeviceId).toBe(wearableDeviceId)
  })

  it('should throw an error if the habit already exists', async () => {
    // Given
    userRepository.setUsers([user])
    habitRepository.save(habit)
    const habitName = habit.nameValue
    const habitDescription = habit.descriptionValue
    const habitSchedule = habit.scheduleValue
    const userId = user.idValue

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      habitSchedule.frequency,
      habitSchedule.duration,
      habitSchedule.restTime,
      userId,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      HabitAlreadyExistsError,
    )
  })

  it('should throw an error if the user does not exist', async () => {
    // Given
    const habitName = habit.nameValue
    const habitDescription = habit.descriptionValue
    const habitSchedule = habit.scheduleValue
    const userId = user.idValue

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      habitSchedule.frequency,
      habitSchedule.duration,
      habitSchedule.restTime,
      userId,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(UserNotFoundError)
  })

  it('should throw an error if the habit description is empty', async () => {
    // Given
    userRepository.setUsers([user])
    const habitName = habit.nameValue
    const habitDescription = ''
    const habitSchedule = habit.scheduleValue
    const userId = user.idValue

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      habitSchedule.frequency,
      habitSchedule.duration,
      habitSchedule.restTime,
      userId,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      InvalidHabitDescriptionError,
    )
  })

  it('should throw an error if the habit name is empty', async () => {
    // Given
    userRepository.setUsers([user])
    const habitName = ''
    const habitDescription = habit.descriptionValue
    const habitSchedule = habit.scheduleValue
    const userId = user.idValue

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      habitSchedule.frequency,
      habitSchedule.duration,
      habitSchedule.restTime,
      userId,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      InvalidHabitNameError,
    )
  })

  it('should throw an error if the habit schedule is invalid', async () => {
    // Given
    userRepository.setUsers([user])
    const habitName = habit.nameValue
    const habitDescription = habit.descriptionValue
    const habitSchedule = habit.scheduleValue
    const userId = user.idValue

    // Habit invalid frequency
    const invalidFrequency = 'INVALID_FREQUENCY' as Frequency

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      invalidFrequency,
      habitSchedule.duration,
      habitSchedule.restTime,
      userId,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      InvalidHabitScheduleError,
    )
  })

  it('should throw an error if the duration + rest time exceeds the frequency', async () => {
    // Given
    userRepository.setUsers([user])
    const habitName = habit.nameValue
    const habitDescription = habit.descriptionValue
    const habitSchedule = habit.scheduleValue
    const userId = user.idValue

    // Habit duration and rest time that exceed the DAILY frequency (86400 seconds)
    const invalidDuration = 86399
    const invalidRestTime = 2

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      habitSchedule.frequency,
      invalidDuration,
      invalidRestTime,
      userId,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      InvalidHabitScheduleError,
    )
  })
})
