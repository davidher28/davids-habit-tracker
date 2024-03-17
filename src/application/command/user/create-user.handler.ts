import { CreateUserCommand } from './create-user.command'
import { UserRepository } from '../../../domain/user/user.repository'
import { UserAlreadyExistsError } from './user.already-exists.error'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { UserName } from '../../../domain/user/user.username'
import { User } from '../../../domain/user/user'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const userName = UserName.create(command.userName)
    if (this.userRepository.findByUserName(userName)) {
      throw UserAlreadyExistsError.withUserName(userName.value)
    }

    const user = User.create(command.userName, command.email, command.fullName)
    this.userRepository.save(user)
  }
}
