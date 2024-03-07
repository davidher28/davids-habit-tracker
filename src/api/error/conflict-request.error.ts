import { UserAlreadyExistsError } from './user/user-already-exists.error'
import { HabitAlreadyExistsError } from './habit/habit-already-exists.error'
import { ProgressAlreadyExistsError } from './progress/progress-already-exists.error'

export type ConflictRequestErrorType =
  | UserAlreadyExistsError
  | HabitAlreadyExistsError
  | ProgressAlreadyExistsError
export const ConflictRequestErrors = [
  UserAlreadyExistsError,
  HabitAlreadyExistsError,
  ProgressAlreadyExistsError,
]
