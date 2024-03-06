import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    response.status(HttpStatus.BAD_REQUEST).json({
      code: 'bad-request',
      message: exception.message,
    })
  }
}
