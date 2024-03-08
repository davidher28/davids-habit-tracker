import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import {
  BadRequestErrors,
  BadRequestErrorType,
} from '../error/bad-request.error'

@Catch(...BadRequestErrors)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestErrorType, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    response.status(HttpStatus.BAD_REQUEST).json({
      code: exception.code,
      message: exception.message,
    })
  }
}
