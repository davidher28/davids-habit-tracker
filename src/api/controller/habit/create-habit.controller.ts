import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateHabitDTO } from './create-habit.dto'
import { CreateHabitCommand } from '../../../application/command/habit/create-habit.command'

@Controller('habits')
export class CreateHabitController {
  static successCode: string = 'habit-created'
  static successMessage: string = 'The habit has been successfully created.'

  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createHabit(
    @Body() request: CreateHabitDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const createHabitCommand = new CreateHabitCommand(
      request.name,
      request.description,
      request.frequency,
      request.duration,
      request.restTime,
      request.userId,
      request.wearableDeviceId,
    )
    await this.commandBus.execute(createHabitCommand)

    Logger.log(CreateHabitController.successMessage, CreateHabitController.name)
    return response.status(HttpStatus.CREATED).json({
      code: CreateHabitController.successCode,
      message: CreateHabitController.successMessage,
    })
  }
}
