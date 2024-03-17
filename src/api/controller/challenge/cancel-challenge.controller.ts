import { Controller, HttpStatus, Logger, Param, Put, Res } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CancelChallengeDTO } from './cancel-challenge.dto'
import { CancelChallengeCommand } from '../../../application/command/challenge/cancel-challenge.command'

@Controller('challenges')
export class CancelChallengeController {
  private readonly logger = new Logger(CancelChallengeController.name)

  static successCode: string = 'challenge-cancelled'
  static successMessage: string =
    'The challenge has been successfully cancelled.'

  constructor(private readonly commandBus: CommandBus) {}

  @Put('cancel/:challengeId')
  async cancelChallenge(
    @Param() queryParameters: CancelChallengeDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const cancelChallengeCommand = new CancelChallengeCommand(
      queryParameters.challengeId,
    )
    await this.commandBus.execute(cancelChallengeCommand)

    this.logger.log(CancelChallengeController.successMessage)

    return response.status(HttpStatus.OK).json({
      code: CancelChallengeController.successCode,
      message: CancelChallengeController.successMessage,
    })
  }
}
