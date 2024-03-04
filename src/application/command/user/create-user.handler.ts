import { CreateUserCommand } from './create-user.command'
import { UserRepository } from '../../../domain/user/user.repository'
import { User } from '../../../domain/user/user'
import { UserAlreadyExistsError } from './user-already-exists.error'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject, Logger } from '@nestjs/common'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    if (this.repository.findByUserName(command.userName)) {
      throw UserAlreadyExistsError.withUsername(command.userName)
    }

    const user = new User(command.id, command.userName, command.fullName)

    this.repository.save(user)

    Logger.log(
      `The user has been successfully created with ID: ${user.id}`,
      'CreateUserHandler',
    )
  }
}
