import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    response.status(HttpStatus.NOT_FOUND).json({
      code: 'not-found',
      message: exception.message,
    })
  }
}
