import { Controller, Get, HttpStatus, Logger, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { QueryBus } from '@nestjs/cqrs'
import { GetHabitsQuery } from '../../../application/query/habit/get-habits.query'
import { GetHabitsDTO } from '../../../application/query/habit/get-habits.dto'
import { Habit } from '../../../domain'

@Controller('habits')
export class GetHabitsController {
  static successCode: string = 'habits-retrieved'
  static successMessage: string = 'The habits has been successfully retrieved.'

  constructor(private readonly queryBus: QueryBus) {}

  @Get(':userId')
  async getHabits(
    @Param() queryParameters: GetHabitsDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const getHabitsQuery = new GetHabitsQuery(queryParameters.userId)
    const habits = await this.queryBus.execute(getHabitsQuery)

    Logger.log(GetHabitsController.successMessage, GetHabitsController.name)
    return response.status(HttpStatus.OK).json({
      code: GetHabitsController.successCode,
      message: GetHabitsController.successMessage,
      data: habits.map((habit: Habit) => JSON.stringify(habit)),
    })
  }
}
