import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { BaseError } from '../error/base.error'

@Catch(BaseError)
export class BaseErrorFilter implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    response.status(exception.status).json({
      code: exception.code,
      message: exception.message,
    })
  }
}
