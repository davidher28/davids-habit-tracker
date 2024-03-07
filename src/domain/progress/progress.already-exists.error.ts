import { BaseError } from '../../api/error/base-error'

export class ProgressAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super('progress-already-exists', message)
  }

  static withDate(date: Date): ProgressAlreadyExistsError {
    return new ProgressAlreadyExistsError(
      `Progress with date ${date.toString()} already exists.`,
    )
  }
}
