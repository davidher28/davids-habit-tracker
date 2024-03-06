import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

@Catch(UserAlreadyExistsError)
export class UserAlreadyExistsFilter implements ExceptionFilter {
  catch(exception: UserAlreadyExistsError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    response.status(HttpStatus.CONFLICT).json({
      code: exception.code,
      message: exception.message,
    })
  }
}
