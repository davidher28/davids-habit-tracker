import { CreateUserCommand } from './create-user.command'
import { CreateUserHandler } from './create-user.handler'
import { InMemoryUserRepository } from '../../../infrastructure/persistence/user/user.in-memory.repository'
import { UserMother } from '../../../../test/user/user.mother'

describe('CreateUserHandler', () => {
  const prepareScenario = () => {
    const repository = new InMemoryUserRepository()
    const handler = new CreateUserHandler(repository)
    const user = UserMother.create()
    return { repository, handler, user }
  }

  it('should create the user', async () => {
    // Given
    const { repository, handler, user } = prepareScenario()

    // When
    const command = new CreateUserCommand(user.id, user.userName, user.fullName)
    await handler.execute(command)

    // Then
    expect(repository.isExistingUser(user)).toBeTruthy()
  })

  it('should throw an error if the user already exists', async () => {
    // Given
    const { repository, handler, user } = prepareScenario()
    repository.withUsers([user])

    // When
    const command = new CreateUserCommand(user.id, user.userName, user.fullName)

    // Then
    await expect(handler.execute(command)).rejects.toThrow()
  })

  it('should throw an error if the user is not valid', () => {
    // TODO: Implement this test case
    // Given
    // When
    // Then
  })
})
