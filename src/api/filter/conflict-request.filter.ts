import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import {
  ConflictRequestErrors,
  ConflictRequestErrorType,
} from '../error/conflict-request.error'

@Catch(...ConflictRequestErrors)
export class ConflictRequestFilter implements ExceptionFilter {
  catch(exception: ConflictRequestErrorType, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    response.status(HttpStatus.CONFLICT).json({
      code: exception.code,
      message: exception.message,
    })
  }
}
