import { Body, Controller, Logger, Post, Res, UseFilters } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { UserAlreadyExistsFilter } from '../../../api/filters/conflict-request.filter'
import { BadRequestFilter } from '../../../api/filters/bad-request.filter'
import { CreateHabitDTO } from '../../command/habit/create-habit.dto'
import { CreateHabitCommand } from '../../command/habit/create-habit.command'

@Controller('habits')
export class CreateHabitController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseFilters(new UserAlreadyExistsFilter(), new BadRequestFilter())
  async createHabit(
    @Body() request: CreateHabitDTO,
    @Res() response: Response,
  ): Promise<Response> {
    await this.commandBus.execute(new CreateHabitCommand())

    const message = 'The habit has been successfully created.'
    Logger.log(message, 'CreateHabitController')

    return response.status(201).json({
      code: 'habit-created',
      message: message,
    })
  }
}
