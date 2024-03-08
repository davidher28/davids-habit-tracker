import { Body, Controller, Logger, Post, Res, UseFilters } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { ConflictFilter } from '../../filter/conflict.filter'
import { BadRequestFilter } from '../../filter/bad-request.filter'
import { CreateHabitDTO } from './create-habit.dto'
import { CreateHabitCommand } from '../../../application/command/habit/create-habit.command'
import { NotFoundFilter } from '../../filter/not-found.filter'

@Controller('habits')
export class CreateHabitController {
  private readonly SUCCESS_MESSAGE = 'The habit has been successfully created.'
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseFilters(
    new ConflictFilter(),
    new BadRequestFilter(),
    new NotFoundFilter(),
  )
  async createHabit(
    @Body() request: CreateHabitDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const newHabitCommand = new CreateHabitCommand(
      request.name,
      request.description,
      request.frequency,
      request.duration,
      request.restTime,
      request.userId,
      request.wearableDeviceId,
    )
    await this.commandBus.execute(newHabitCommand)

    Logger.log(this.SUCCESS_MESSAGE, 'CreateHabitController')
    return response.status(201).json({
      code: 'habit-created',
      message: this.SUCCESS_MESSAGE,
    })
  }
}
