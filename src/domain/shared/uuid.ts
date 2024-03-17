import { v4 as uuidv4, validate } from 'uuid'
import { InvalidUUId } from './invalid-uuid'

export class UUId {
  protected constructor(readonly value: string) {
    if (!String(value).trim()) {
      throw InvalidUUId.withMessage('The UUID must be a non-empty string.')
    }

    if (!validate(value)) {
      throw InvalidUUId.withMessage('The UUID provided is not a valid UUIDv4.')
    }

    this.value = value
  }

  public static generate(): string {
    return uuidv4()
  }

  public equals(id: UUId): boolean {
    return this.value === id.value
  }
}
