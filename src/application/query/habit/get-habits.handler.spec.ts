import { v4 as uuidv4 } from 'uuid'
import { GetHabitsQuery } from './get-habits.query'
import { GetHabitsHandler } from './get-habits.handler'
import { InMemoryHabitRepository } from '../../../infrastructure/habit/habit.in-memory.repository'
import { InMemoryUserRepository } from '../../../infrastructure/user/user.in-memory.repository'
import { User } from '../../../domain'
import { UserMother } from '../../../../test/user/user.mother'
import { HabitMother } from '../../../../test/habit/habit.mother'
import { UserNotFoundError } from '../../../domain/user/user.not-found.error'

describe('GetHabitsHandler', () => {
  const user: User = UserMother.create()
  const habitRepository: InMemoryHabitRepository = new InMemoryHabitRepository()
  const userRepository: InMemoryUserRepository = new InMemoryUserRepository()
  const handler: GetHabitsHandler = new GetHabitsHandler(
    habitRepository,
    userRepository,
  )

  it('should read the habits of the user', async () => {
    // Given
    const userId = user.idValue
    const users = [user]
    userRepository.setUsers(users)

    const habit1 = HabitMother.createWithUserId(userId)
    const habit2 = HabitMother.createWithUserId(userId)
    const habit3 = HabitMother.createWithUserId(userId)
    const habits = [habit1, habit2, habit3]
    habitRepository.setHabits(habits)

    // When
    const query = new GetHabitsQuery(userId)
    const result = await handler.execute(query)

    // Then
    expect(result).toEqual(habits)
  })

  it('should throw an error if the user does not exist', async () => {
    // Given
    const userId = uuidv4()

    // When
    const query = new GetHabitsQuery(userId)

    // Then
    await expect(handler.execute(query)).rejects.toThrow(UserNotFoundError)
  })
})
