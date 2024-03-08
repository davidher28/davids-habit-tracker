import { v4 as uuidv4, validate } from 'uuid'
import { InvalidUUIdError } from './invalid-uuid.error'

export class UUId {
  readonly value: string

  constructor(value: string) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw InvalidUUIdError.withMessage('The UUID must be a non-empty string.')
    }

    if (!validate(value)) {
      throw InvalidUUIdError.withMessage(
        'The UUID provided is not a valid UUIDv4.',
      )
    }

    this.value = value
  }

  static generate(): string {
    return uuidv4()
  }

  equals(id: UUId): boolean {
    return this.value === id.value
  }
}
