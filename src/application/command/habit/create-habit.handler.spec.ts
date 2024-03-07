import { CreateHabitCommand } from './create-habit.command'
import { CreateHabitHandler } from './create-habit.handler'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { UserRepository } from '../../../domain/user/user.repository'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { InMemoryUserRepository } from '../../../infrastructure/user/user.in-memory.repository'
import { Habit, User } from '../../../domain'
import { HabitMother } from '../../../../test/habit/habit.mother'
import { UserMother } from '../../../../test/user/user.mother'
import { HabitAlreadyExistsError } from '../../../api/error/habit/habit-already-exists.error'
import { NotFoundException } from '@nestjs/common'

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

  it('should create the habit', async () => {
    // Given
    userRepository.setUsers([user])
    const habitName = habit.nameValue
    const habitDescription = habit.descriptionValue
    const habitFrequency = habit.frequencyValue
    const userId = user.idValue

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      habitFrequency,
      userId,
    )
    await handler.execute(command)

    // Then
    expect(habitRepository.findByName(habit.nameValue)).toBeTruthy()
  })

  it('should throw an error if the habit already exists', async () => {
    // Given
    userRepository.setUsers([user])
    habitRepository.save(habit)
    const habitName = habit.nameValue
    const habitDescription = habit.descriptionValue
    const habitFrequency = habit.frequencyValue
    const userId = user.idValue

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      habitFrequency,
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
    const habitFrequency = habit.frequencyValue
    const userId = user.idValue

    // When
    const command = new CreateHabitCommand(
      habitName,
      habitDescription,
      habitFrequency,
      userId,
    )

    // Then
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException)
  })
})
