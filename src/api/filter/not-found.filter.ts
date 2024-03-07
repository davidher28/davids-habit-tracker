import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { NotFoundErrors, NotFoundErrorType } from '../error/not-found.error'

@Catch(...NotFoundErrors)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundErrorType, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    response.status(HttpStatus.NOT_FOUND).json({
      code: exception.code,
      message: exception.message,
    })
  }
}
