import { v4 as uuidv4 } from 'uuid'
import { BadRequestException } from '@nestjs/common'

export class UUId {
  readonly value: string

  constructor(value: string) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new BadRequestException('The UUID must be a non-empty string.')
    }

    const uuidRegex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    if (!uuidRegex.test(value)) {
      throw new BadRequestException('The UUID provided is not a valid UUIDv4.')
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
