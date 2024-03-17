import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateChallengeDTO } from './create-challenge.dto'
import { CreateChallengeCommand } from '../../application/command/challenge/create-challenge.command'

@Controller('challenges')
export class CreateChallengeController {
  private readonly logger = new Logger(CreateChallengeController.name)

  static successCode: string = 'challenge-created'
  static successMessage: string = 'The challenge has been successfully created.'

  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createChallenge(
    @Body() request: CreateChallengeDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const createChallengeCommand = new CreateChallengeCommand(
      request.habitId,
      request.description,
      request.habitTimes,
      request.startDate,
      request.endDate,
    )
    await this.commandBus.execute(createChallengeCommand)

    this.logger.log(CreateChallengeController.successMessage)

    return response.status(HttpStatus.CREATED).json({
      code: CreateChallengeController.successCode,
      message: CreateChallengeController.successMessage,
    })
  }
}
