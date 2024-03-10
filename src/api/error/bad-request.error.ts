import {
  InvalidUserEmailError,
  InvalidFullNameError,
  InvalidUserNameError,
  InvalidUuid,
  InvalidHabitNameError,
  InvalidHabitDescriptionError,
  InvalidHabitScheduleError,
  InvalidProgressDateError,
  InvalidProgressObservationsError,
} from '../../domain'

export type BadRequestErrorType =
  | InvalidUuid
  | InvalidUserNameError
  | InvalidFullNameError
  | InvalidUserEmailError
  | InvalidHabitNameError
  | InvalidHabitDescriptionError
  | InvalidHabitScheduleError
  | InvalidProgressDateError
  | InvalidProgressObservationsError

export const BadRequestErrors = [
  InvalidUuid,
  InvalidUserNameError,
  InvalidFullNameError,
  InvalidUserEmailError,
  InvalidHabitNameError,
  InvalidHabitDescriptionError,
  InvalidHabitScheduleError,
  InvalidProgressDateError,
  InvalidProgressObservationsError,
]
