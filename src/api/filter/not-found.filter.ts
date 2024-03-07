import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { UserNotFoundError } from '../error/user/user-not-found.error'
import { HabitNotFoundError } from '../error/habit/habit-not-found.error'

type NotFoundError = HabitNotFoundError | UserNotFoundError

@Catch(HabitNotFoundError, UserNotFoundError)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    response.status(HttpStatus.NOT_FOUND).json({
      code: exception.code,
      message: exception.message,
    })
  }
}
