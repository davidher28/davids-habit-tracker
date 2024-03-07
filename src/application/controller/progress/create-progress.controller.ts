import { Body, Controller, Logger, Post, Res, UseFilters } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { ConflictFilter } from '../../../api/filter/conflict.filter'
import { BadRequestFilter } from '../../../api/filter/bad-request.filter'
import { NotFoundFilter } from '../../../api/filter/not-found.filter'
import { CreateProgressDTO } from '../../command/progress/create-progress.dto'
import { CreateProgressCommand } from '../../command/progress/create-progress.command'

@Controller('habits')
export class CreateProgressController {
  private readonly SUCCESS_MESSAGE =
    'The progress has been successfully created.'
  constructor(private readonly commandBus: CommandBus) {}

  @Post('progress')
  @UseFilters(
    new ConflictFilter(),
    new BadRequestFilter(),
    new NotFoundFilter(),
  )
  async createHabit(
    @Body() request: CreateProgressDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const newProgressCommand = new CreateProgressCommand(
      request.habitId,
      request.progressDate,
      request.observations,
    )
    await this.commandBus.execute(newProgressCommand)

    Logger.log(this.SUCCESS_MESSAGE, 'CreateProgressController')
    return response.status(201).json({
      code: 'progress-created',
      message: this.SUCCESS_MESSAGE,
    })
  }
}
