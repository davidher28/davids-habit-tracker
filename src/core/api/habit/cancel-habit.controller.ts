import { Controller, HttpStatus, Logger, Param, Put, Res } from '@nestjs/common'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CancelHabitDTO } from './cancel-habit.dto'
import { CancelHabitCommand } from '../../application/command/habit/cancel-habit.command'

@Controller('habits')
export class CancelHabitController {
  private readonly logger = new Logger(CancelHabitController.name)

  static successCode: string = 'habit-cancelled'
  static successMessage: string = 'The habit has been successfully cancelled.'

  constructor(private readonly commandBus: CommandBus) {}

  @Put('cancel/:habitId')
  async cancelChallenge(
    @Param() queryParameters: CancelHabitDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const cancelHabitCommand = new CancelHabitCommand(queryParameters.habitId)
    await this.commandBus.execute(cancelHabitCommand)

    this.logger.log(CancelHabitController.successMessage)

    return response.status(HttpStatus.OK).json({
      code: CancelHabitController.successCode,
      message: CancelHabitController.successMessage,
    })
  }
}
