import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { Response } from 'express'
import { UserNotFoundError } from '../error/user/user-not-found.error'

type NotFoundError = NotFoundException | UserNotFoundError

@Catch(NotFoundException, UserNotFoundError)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    response.status(HttpStatus.NOT_FOUND).json({
      code: exception['code'] || 'not-found',
      message: exception.message,
    })
  }
}
