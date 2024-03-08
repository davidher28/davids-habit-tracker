import { Body, Controller, Logger, Post, Res, UseFilters } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { ConflictFilter } from '../../filter/conflict.filter'
import { BadRequestFilter } from '../../filter/bad-request.filter'
import { NotFoundFilter } from '../../filter/not-found.filter'
import { CreateChallengeDTO } from './create-challenge.dto'
import { CreateChallengeCommand } from '../../../application/command/habit/create-challenge.command'

@Controller('habits')
export class CreateChallengeController {
  private readonly SUCCESS_MESSAGE =
    'The challenge has been successfully created.'
  constructor(private readonly commandBus: CommandBus) {}

  @Post('challenges')
  @UseFilters(
    new ConflictFilter(),
    new BadRequestFilter(),
    new NotFoundFilter(),
  )
  async createChallenge(
    @Body() request: CreateChallengeDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const newChallengeCommand = new CreateChallengeCommand(
      request.habitId,
      request.description,
      request.numberOfTimes,
      request.startDate,
      request.endDate,
    )
    await this.commandBus.execute(newChallengeCommand)

    Logger.log(this.SUCCESS_MESSAGE, 'CreateChallengeController')
    return response.status(201).json({
      code: 'challenge-created',
      message: this.SUCCESS_MESSAGE,
    })
  }
}
