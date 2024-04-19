import { HttpStatus } from '@nestjs/common'

export abstract class BaseError extends Error {
  protected constructor(
    readonly code: string,
    readonly message: string,
    readonly status: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message)
  }
}
