import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Res,
  UseFilters,
} from '@nestjs/common'
import { Response } from 'express'
import { QueryBus } from '@nestjs/cqrs'
import { BadRequestFilter } from '../../filter/bad-request.filter'
import { NotFoundFilter } from '../../filter/not-found.filter'
import { GetHabitsQuery } from '../../../application/query/habit/get-habits.query'
import { GetHabitsDTO } from '../../../application/query/habit/get-habits.dto'
import { Habit } from '../../../domain'

@Controller('habits')
export class GetHabitsController {
  private readonly SUCCESS_MESSAGE =
    'The habits has been successfully retrieved.'
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':userId')
  @UseFilters(new BadRequestFilter(), new NotFoundFilter())
  async getHabits(
    @Param() queryParameters: GetHabitsDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const habitsQuery = new GetHabitsQuery(queryParameters.userId)
    const habits = await this.queryBus.execute(habitsQuery)

    Logger.log(this.SUCCESS_MESSAGE, 'GetHabitsController')
    return response.status(HttpStatus.OK).json({
      code: 'habits-retrieved',
      message: this.SUCCESS_MESSAGE,
      data: habits.map((habit: Habit) => JSON.stringify(habit)),
    })
  }
}
