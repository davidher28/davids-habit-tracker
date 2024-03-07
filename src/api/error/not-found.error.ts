import { HabitNotFoundError } from './habit/habit-not-found.error'
import { UserNotFoundError } from './user/user-not-found.error'

export type NotFoundErrorType = HabitNotFoundError | UserNotFoundError
export const NotFoundErrors = [HabitNotFoundError, UserNotFoundError]
