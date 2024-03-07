import { v4 as uuidv4, validate as uuidValidate } from 'uuid'
import { BadRequestException } from '@nestjs/common'

export class UUId {
  readonly value: string

  constructor(value: string) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new BadRequestException('The UUID must be a non-empty string.')
    }

    if (!uuidValidate(value)) {
      throw new BadRequestException('The UUID provided is not a valid UUIDv4.')
    }

    this.value = value
  }

  static create(value: string): UUId {
    return new UUId(value)
  }

  static generate(): string {
    return uuidv4()
  }

  equals(id: string): boolean {
    return this.value === id
  }
}
