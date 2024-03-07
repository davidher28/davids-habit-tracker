import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { UserAlreadyExistsError } from '../error/user/user-already-exists.error'
import { HabitAlreadyExistsError } from '../error/habit/habit-already-exists.error'
import { ProgressAlreadyExistsError } from '../error/progress/progress-already-exists.error'

type ConflictError =
  | UserAlreadyExistsError
  | HabitAlreadyExistsError
  | ProgressAlreadyExistsError

@Catch(
  UserAlreadyExistsError,
  HabitAlreadyExistsError,
  ProgressAlreadyExistsError,
)
export class ConflictRequestFilter implements ExceptionFilter {
  catch(exception: ConflictError, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    response.status(HttpStatus.CONFLICT).json({
      code: exception.code,
      message: exception.message,
    })
  }
}
