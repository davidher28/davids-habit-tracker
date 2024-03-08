import {
  InvalidUserEmailError,
  InvalidFullNameError,
  InvalidUserNameError,
  InvalidUUIdError,
  InvalidHabitNameError,
  InvalidHabitDescriptionError,
  InvalidHabitScheduleError,
  InvalidProgressDateError,
  InvalidProgressObservationsError,
} from '../../domain'

export type BadRequestErrorType =
  | InvalidUUIdError
  | InvalidUserNameError
  | InvalidFullNameError
  | InvalidUserEmailError
  | InvalidHabitNameError
  | InvalidHabitDescriptionError
  | InvalidHabitScheduleError
  | InvalidProgressDateError
  | InvalidProgressObservationsError

export const BadRequestErrors = [
  InvalidUUIdError,
  InvalidUserNameError,
  InvalidFullNameError,
  InvalidUserEmailError,
  InvalidHabitNameError,
  InvalidHabitDescriptionError,
  InvalidHabitScheduleError,
  InvalidProgressDateError,
  InvalidProgressObservationsError,
]
