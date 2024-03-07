import { Body, Controller, Logger, Post, Res, UseFilters } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { ConflictRequestFilter } from '../../../api/filter/conflict-request.filter'
import { BadRequestFilter } from '../../../api/filter/bad-request.filter'
import { CreateHabitDTO } from '../../command/habit/create-habit.dto'
import { CreateHabitCommand } from '../../command/habit/create-habit.command'
import { NotFoundFilter } from '../../../api/filter/not-found.filter'

@Controller('habits')
export class CreateHabitController {
  private readonly SUCCESS_MESSAGE = 'The habit has been successfully created.'
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseFilters(
    new ConflictRequestFilter(),
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
