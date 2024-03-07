import { CreateUserCommand } from './create-user.command'
import { UserRepository } from '../../../domain/user/user.repository'
import { UserAlreadyExistsError } from '../../../api/error/user/user-already-exists.error'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import {
  User,
  UserEmail,
  UserFullName,
  UserId,
  UserName,
} from '../../../domain'
import { UUId } from '../../../domain/shared/uuid.value-object'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const userName = UserName.create(command.userName)
    if (this.userRepository.findByUserName(userName.value)) {
      throw UserAlreadyExistsError.withUserName(command.userName)
    }

    const uuid = UUId.generate()
    const userId = UserId.create(uuid)
    const userEmail = UserEmail.create(command.email)
    const userFullName = UserFullName.create(command.fullName)

    const user = new User(userId, userName, userEmail, userFullName)
    this.userRepository.save(user)
  }
}
