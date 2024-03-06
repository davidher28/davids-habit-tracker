import { v4 as uuidv4 } from 'uuid'

export class UUId {
  readonly value: string

  constructor(value: string) {
    const uuidRegex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

    if (!uuidRegex.test(value)) {
      throw new TypeError('Invalid UUID v4')
    }

    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new Error('ID must be a non-empty string')
    }

    this.value = value
  }

  static create(value: string): UUId {
    return new UUId(value)
  }

  static generateId(): string {
    return uuidv4()
  }
}
