import { HabitNotFoundError } from '../../application/command/habit/habit.not-found.error'
import { UserNotFoundError } from '../../application/command/user/user.not-found.error'

export type NotFoundErrorType = HabitNotFoundError | UserNotFoundError
export const NotFoundErrors = [HabitNotFoundError, UserNotFoundError]
