import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { ConflictErrors, ConflictErrorType } from '../error/conflict.error'

@Catch(...ConflictErrors)
export class ConflictFilter implements ExceptionFilter {
  catch(exception: ConflictErrorType, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    response.status(HttpStatus.CONFLICT).json({
      code: exception.code,
      message: exception.message,
    })
  }
}
