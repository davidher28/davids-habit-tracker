import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'
import { HabitAlreadyExistsError } from '../errors/habit-already-exists.error'

type ConflictError = UserAlreadyExistsError | HabitAlreadyExistsError

@Catch(UserAlreadyExistsError, HabitAlreadyExistsError)
export class ConflictRequestFilter implements ExceptionFilter {
  catch(exception: ConflictError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    response.status(HttpStatus.CONFLICT).json({
      code: exception.code,
      message: exception.message,
    })
  }
}
