import {
  InvalidUserEmailError,
  InvalidFullNameError,
  InvalidUserNameError,
  InvalidUUId,
  InvalidHabitNameError,
  InvalidHabitDescriptionError,
  InvalidHabitScheduleError,
  InvalidProgressDateError,
  InvalidProgressObservationsError,
} from '../../domain'

export type BadRequestErrorType =
  | InvalidUUId
  | InvalidUserNameError
  | InvalidFullNameError
  | InvalidUserEmailError
  | InvalidHabitNameError
  | InvalidHabitDescriptionError
  | InvalidHabitScheduleError
  | InvalidProgressDateError
  | InvalidProgressObservationsError

export const BadRequestErrors = [
  InvalidUUId,
  InvalidUserNameError,
  InvalidFullNameError,
  InvalidUserEmailError,
  InvalidHabitNameError,
  InvalidHabitDescriptionError,
  InvalidHabitScheduleError,
  InvalidProgressDateError,
  InvalidProgressObservationsError,
]
