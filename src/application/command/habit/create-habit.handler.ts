import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { HabitAlreadyExistsError } from '../../../api/errors/habit-already-exists.error'
import { CreateHabitCommand } from './create-habit.command'
import { HabitRepository } from '../../../domain/habit/habit.repository'

@CommandHandler(CreateHabitCommand)
export class CreateHabitHandler implements ICommandHandler<CreateHabitCommand> {
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
  ) {}

  async execute(command: CreateHabitCommand): Promise<void> {
    if (this.habitRepository.findByName(command.name)) {
      throw HabitAlreadyExistsError.withName(command.name)
    }

    // TODO: Implement the logic to create a new habit
    // this.habitRepository.save(habit)
  }
}
