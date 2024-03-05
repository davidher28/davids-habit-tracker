import { CreateUserCommand } from './create-user.command'
import { UserRepository } from '../../../domain/user/user.repository'
import { User } from '../../../domain/user/user'
import { UserAlreadyExistsError } from '../../../api/user/user-already-exists.error'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    if (this.userRepository.findByUserName(command.userName)) {
      throw new UserAlreadyExistsError(command.userName)
    }

    const user = new User(
      command.id,
      command.userName,
      command.email,
      command.fullName,
      new Date(),
      new Date(),
    )
    this.userRepository.save(user)
  }
}
