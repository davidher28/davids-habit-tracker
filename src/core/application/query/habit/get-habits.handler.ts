import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { GetHabitsQuery } from './get-habits.query'
import { Inject } from '@nestjs/common'
import { UserRepository } from '../../../domain/user/user.repository'
import { UserNotFoundError } from '../../command/user/user.not-found.error'
import { Habit } from '../../../domain/habit/habit'
import { UserId } from '../../../domain/user/user.id'

@QueryHandler(GetHabitsQuery)
export class GetHabitsHandler implements IQueryHandler<GetHabitsQuery> {
  constructor(
    @Inject(HabitRepository) private readonly habitRepository: HabitRepository,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetHabitsQuery): Promise<Habit[]> {
    const userId = UserId.create(query.userId)
    if (!this.userRepository.isExistingUser(userId)) {
      throw UserNotFoundError.withId(userId.value)
    }

    return this.habitRepository.findByUserId(userId)
  }
}
