import { CreateUserCommand } from './create-user.command'
import { CreateUserHandler } from './create-user.handler'
import { InMemoryUserRepository } from '../../../infrastructure/persistence/user/user.in-memory.repository'
import { UserMother } from '../../../../test/user/user.mother'
import { User } from '../../../domain'
import { UserAlreadyExistsError } from '../../../api/errors/user-already-exists.error'
import { BadRequestException } from '@nestjs/common'

describe('CreateUserHandler', () => {
  let user: User
  let repository: InMemoryUserRepository
  let handler: CreateUserHandler

  beforeEach(() => {
    user = UserMother.create()
    repository = new InMemoryUserRepository()
    handler = new CreateUserHandler(repository)
  })

  it('should create the user', async () => {
    // Given
    const userName = user.userNameValue
    const email = user.emailValue
    const fullName = user.fullNameValue

    // When
    const command = new CreateUserCommand(userName, email, fullName)
    await handler.execute(command)

    // Then
    expect(repository.findByUserName(user.userNameValue)).toBeTruthy()
  })

  it('should throw an error if the user already exists', async () => {
    // Given
    repository.setUsers([user])
    const userName = user.userNameValue
    const email = user.emailValue
    const fullName = user.fullNameValue

    // When
    const command = new CreateUserCommand(userName, email, fullName)

    // Then
    await expect(handler.execute(command)).rejects.toThrow(
      UserAlreadyExistsError,
    )
  })

  it('should throw an error if the user name is empty', async () => {
    // Given
    const emptyUserName = ''
    const email = user.emailValue
    const fullName = user.fullNameValue

    // When
    const command = new CreateUserCommand(emptyUserName, email, fullName)

    // Then
    await expect(handler.execute(command)).rejects.toThrow(BadRequestException)
  })

  it('should throw an error if the user email is not valid', async () => {
    // Given
    const userName = user.userNameValue
    const invalidEmail = 'invalidEmail'
    const fullName = user.fullNameValue

    // When
    const command = new CreateUserCommand(userName, invalidEmail, fullName)

    // Then
    await expect(handler.execute(command)).rejects.toThrow(BadRequestException)
  })

  it('should throw an error if the full name is empty', async () => {
    // Given
    const userName = user.userNameValue
    const email = user.emailValue
    const emptyFullName = ''

    // When
    const command = new CreateUserCommand(userName, email, emptyFullName)

    // Then
    await expect(handler.execute(command)).rejects.toThrow(BadRequestException)
  })
})
