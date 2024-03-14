import { HttpStatus } from '@nestjs/common'

export abstract class BaseError extends Error {
  protected constructor(
    readonly status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    readonly code: string,
    readonly message: string,
  ) {
    super(message)
  }
}
