import { CreateUserCommand } from './create-user.command'
import { UserRepository } from '../../../domain/user/user.repository'
import { UserAlreadyExistsError } from './user.already-exists.error'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import {
  UUId,
  User,
  UserEmail,
  UserFullName,
  UserId,
  UserName,
} from '../../../domain'

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

    const uuid = UUId.generate()
    const userId = UserId.create(uuid)
    const userEmail = UserEmail.create(command.email)
    const userFullName = UserFullName.create(command.fullName)
    const user = User.create(userId, userName, userEmail, userFullName)

    this.userRepository.save(user)
  }
}
