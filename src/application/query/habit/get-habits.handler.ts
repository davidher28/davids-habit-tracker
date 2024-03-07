import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { GetHabitsQuery } from './get-habits.query'
import { Inject, NotFoundException } from '@nestjs/common'
import { UserRepository } from '../../../domain/user/user.repository'
import { Habit, UserId } from '../../../domain'

@QueryHandler(GetHabitsQuery)
export class GetHabitsHandler implements IQueryHandler<GetHabitsQuery> {
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetHabitsQuery): Promise<Habit[]> {
    if (!this.userRepository.isExistingUser(query.userId)) {
      throw new NotFoundException('User does not exist')
    }

    const userId = UserId.create(query.userId)
    return this.habitRepository.findByUserId(userId.value)
  }
}
