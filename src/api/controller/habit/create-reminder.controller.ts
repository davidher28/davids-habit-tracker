import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateReminderCommand } from '../../../application/command/habit/create-reminder.command'
import { CreateReminderDTO } from './create-reminder.dto'

@Controller('habits')
export class CreateReminderController {
  private readonly logger = new Logger(CreateReminderController.name)

  static successCode: string = 'reminder-created'
  static successMessage: string = 'The reminder has been successfully created.'

  constructor(private readonly commandBus: CommandBus) {}

  @Post('reminders')
  async createChallenge(
    @Body() request: CreateReminderDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const createReminderCommand = new CreateReminderCommand(
      request.habitId,
      request.message,
      request.state,
      request.time,
    )
    await this.commandBus.execute(createReminderCommand)

    this.logger.log(CreateReminderController.successMessage)

    return response.status(HttpStatus.CREATED).json({
      code: CreateReminderController.successCode,
      message: CreateReminderController.successMessage,
    })
  }
}
