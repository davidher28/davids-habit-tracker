import { BadRequestException } from '@nestjs/common'

export class ProgressObservations {
  readonly value: string

  constructor(value: string) {
    const trimmedValue = value.trim()

    if (trimmedValue.length < 10) {
      throw new BadRequestException(
        'Observations must be at least 10 characters long.',
      )
    }

    if (trimmedValue.length > 200) {
      throw new BadRequestException(
        'Observations cannot exceed 200 characters.',
      )
    }

    this.value = trimmedValue
  }

  static create(value: string): ProgressObservations {
    return new ProgressObservations(value)
  }
}
