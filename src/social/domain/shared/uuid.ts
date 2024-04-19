import { v4 as uuidv4, validate } from 'uuid'
import { InvalidUUId } from './invalid-uuid'

export class UUId {
  protected constructor(readonly value: string) {
    this.value = value
  }

  public static generate(): string {
    return uuidv4()
  }

  protected static guardValidId(value: string): void {
    if (!validate(value)) {
      throw InvalidUUId.withMessage('The UUID provided is not a valid UUIDv4.')
    }
  }

  public equals(id: UUId): boolean {
    return this.value === id.value
  }
}
