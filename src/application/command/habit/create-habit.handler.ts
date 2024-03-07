import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject, NotFoundException } from '@nestjs/common'
import { HabitAlreadyExistsError } from '../../../api/error/habit/habit-already-exists.error'
import { CreateHabitCommand } from './create-habit.command'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { UserRepository } from '../../../domain/user/user.repository'
import {
  Habit,
  HabitDescription,
  HabitFrequency,
  HabitId,
  HabitName,
  UserId,
} from '../../../domain'
import { Frequency } from '../../../domain/habit/habit.frequency'

@CommandHandler(CreateHabitCommand)
export class CreateHabitHandler implements ICommandHandler<CreateHabitCommand> {
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateHabitCommand): Promise<void> {
    const name = HabitName.create(command.name)
    if (this.habitRepository.findByName(name.value)) {
      throw HabitAlreadyExistsError.withName(command.name)
    }

    const userId = UserId.create(command.userId)
    if (!this.userRepository.isExistingUser(userId.value)) {
      throw new NotFoundException('User does not exist')
    }

    const uuid = HabitId.generateId()
    const habitId = HabitId.create(uuid)
    const description = HabitDescription.create(command.description)
    const frequency = HabitFrequency.create(Frequency[command.frequency])

    const habit = new Habit(
      habitId,
      name,
      description,
      frequency,
      userId,
      command.wearableDeviceId,
    )

    this.habitRepository.save(habit)
  }
}
