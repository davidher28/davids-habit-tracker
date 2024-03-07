import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitAlreadyExistsError } from '../../../domain/habit/habit.already-exists.error'
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
import { UserNotFoundError } from '../../../domain/user/user.not-found.error'
import { UUId } from '../../../domain/shared/uuid.value-object'

@CommandHandler(CreateHabitCommand)
export class CreateHabitHandler implements ICommandHandler<CreateHabitCommand> {
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateHabitCommand): Promise<void> {
    const userId = UserId.create(command.userId)
    if (!this.userRepository.isExistingUser(userId.value)) {
      throw UserNotFoundError.withId(userId.value)
    }

    const name = HabitName.create(command.name)
    if (this.habitRepository.findByName(name.value)) {
      throw HabitAlreadyExistsError.withName(command.name)
    }

    const uuid = UUId.generate()
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
