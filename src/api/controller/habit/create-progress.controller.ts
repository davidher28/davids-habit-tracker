import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateProgressDTO } from './create-progress.dto'
import { CreateProgressCommand } from '../../../application/command/habit/create-progress.command'

@Controller('habits')
export class CreateProgressController {
  private readonly logger = new Logger(CreateProgressController.name)

  static successCode: string = 'progress-created'
  static successMessage: string = 'The progress has been successfully created.'

  constructor(private readonly commandBus: CommandBus) {}

  @Post('progress')
  async createProgress(
    @Body() request: CreateProgressDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const createProgressCommand = new CreateProgressCommand(
      request.habitId,
      request.progressDate,
      request.observations,
      request.validated,
    )
    await this.commandBus.execute(createProgressCommand)

    this.logger.log(CreateProgressController.successMessage)

    return response.status(HttpStatus.CREATED).json({
      code: CreateProgressController.successCode,
      message: CreateProgressController.successMessage,
    })
  }
}
