import { UserAlreadyExistsError } from '../../domain/user/user.already-exists.error'
import { HabitAlreadyExistsError } from '../../domain/habit/habit.already-exists.error'
import { ProgressAlreadyExistsError } from '../../domain/progress/progress.already-exists.error'

export type ConflictErrorType =
  | UserAlreadyExistsError
  | HabitAlreadyExistsError
  | ProgressAlreadyExistsError
export const ConflictErrors = [
  UserAlreadyExistsError,
  HabitAlreadyExistsError,
  ProgressAlreadyExistsError,
]
