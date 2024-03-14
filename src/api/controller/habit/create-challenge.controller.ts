import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateChallengeDTO } from './create-challenge.dto'
import { CreateChallengeCommand } from '../../../application/command/habit/create-challenge.command'

@Controller('habits')
export class CreateChallengeController {
  static successCode: string = 'challenge-created'
  static successMessage: string = 'The challenge has been successfully created.'

  constructor(private readonly commandBus: CommandBus) {}

  @Post('challenges')
  async createChallenge(
    @Body() request: CreateChallengeDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const createChallengeCommand = new CreateChallengeCommand(
      request.habitId,
      request.description,
      request.numberOfTimes,
      request.startDate,
      request.endDate,
    )
    await this.commandBus.execute(createChallengeCommand)

    Logger.log(
      CreateChallengeController.successMessage,
      CreateChallengeController.name,
    )
    return response.status(HttpStatus.CREATED).json({
      code: CreateChallengeController.successCode,
      message: CreateChallengeController.successMessage,
    })
  }
}
