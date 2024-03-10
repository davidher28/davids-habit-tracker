import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { ConflictFilter } from '../../filter/conflict.filter'
import { BadRequestFilter } from '../../filter/bad-request.filter'
import { NotFoundFilter } from '../../filter/not-found.filter'
import { CreateReminderCommand } from '../../../application/command/habit/create-reminder.command'
import { CreateReminderDTO } from './create-reminder.dto'

@Controller('habits')
export class CreateReminderController {
  private readonly SUCCESS_MESSAGE =
    'The reminder has been successfully created.'
  constructor(private readonly commandBus: CommandBus) {}

  @Post('reminders')
  @UseFilters(
    new ConflictFilter(),
    new BadRequestFilter(),
    new NotFoundFilter(),
  )
  async createChallenge(
    @Body() request: CreateReminderDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const newReminderCommand = new CreateReminderCommand(
      request.habitId,
      request.message,
      request.state,
      request.time,
    )
    await this.commandBus.execute(newReminderCommand)

    Logger.log(this.SUCCESS_MESSAGE, 'CreateReminderController')
    return response.status(HttpStatus.CREATED).json({
      code: 'reminder-created',
      message: this.SUCCESS_MESSAGE,
    })
  }
}
