import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitAlreadyExistsError } from './habit.already-exists.error'
import { CreateHabitCommand } from './create-habit.command'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { UserRepository } from '../../../domain/user/user.repository'
import { UserNotFoundError } from '../user/user.not-found.error'
import { Frequency } from '../../../domain/habit/habit.schedule'
import { UserId } from '../../../domain/user/user.id'
import { HabitName } from '../../../domain/habit/habit.name'
import { Habit } from '../../../domain/habit/habit'

@CommandHandler(CreateHabitCommand)
export class CreateHabitHandler implements ICommandHandler<CreateHabitCommand> {
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateHabitCommand): Promise<void> {
    const userId = UserId.create(command.userId)
    if (!this.userRepository.isExistingUser(userId)) {
      throw UserNotFoundError.withId(userId.value)
    }

    const name = HabitName.create(command.name)
    if (this.habitRepository.findByName(name)) {
      throw HabitAlreadyExistsError.withName(command.name)
    }

    const habit = Habit.create(
      command.name,
      command.description,
      command.frequency as Frequency,
      command.duration,
      command.restTime,
      command.userId,
      command.wearableDeviceId,
    )
    this.habitRepository.save(habit)
  }
}
