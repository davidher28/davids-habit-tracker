import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject, NotFoundException } from '@nestjs/common'
import { HabitAlreadyExistsError } from '../../../api/error/habit/habit-already-exists.error'
import { CreateHabitCommand } from './create-habit.command'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { UserRepository } from '../../../domain/user/user.repository'
import { Habit } from '../../../domain/habit/habit'
import { HabitDescription, HabitId, HabitName, UserId } from '../../../domain'

@CommandHandler(CreateHabitCommand)
export class CreateHabitHandler implements ICommandHandler<CreateHabitCommand> {
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateHabitCommand): Promise<void> {
    if (this.habitRepository.findByName(command.name)) {
      throw HabitAlreadyExistsError.withName(command.name)
    }

    if (!this.userRepository.isExistingUser(command.userId)) {
      throw new NotFoundException('User does not exist')
    }

    const uuid = HabitId.generateId()
    const habitId = HabitId.create(uuid)

    const name = HabitName.create(command.name)
    const description = HabitDescription.create(command.description)
    const userId = UserId.create(command.userId)

    const habit = new Habit(habitId, name, description, userId)

    this.habitRepository.save(habit)
  }
}
