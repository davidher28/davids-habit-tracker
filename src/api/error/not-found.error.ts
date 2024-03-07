import { HabitNotFoundError } from '../../domain/habit/habit.not-found.error'
import { UserNotFoundError } from '../../domain/user/user.not-found.error'

export type NotFoundErrorType = HabitNotFoundError | UserNotFoundError
export const NotFoundErrors = [HabitNotFoundError, UserNotFoundError]
