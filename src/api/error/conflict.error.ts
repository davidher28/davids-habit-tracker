import { UserAlreadyExistsError } from '../../application/command/user/user.already-exists.error'
import { HabitAlreadyExistsError } from '../../application/command/habit/habit.already-exists.error'

export type ConflictErrorType = UserAlreadyExistsError | HabitAlreadyExistsError

export const ConflictErrors = [UserAlreadyExistsError, HabitAlreadyExistsError]
