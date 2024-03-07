import { Controller, Get, Logger, Param, Res, UseFilters } from '@nestjs/common'
import { Response } from 'express'
import { QueryBus } from '@nestjs/cqrs'
import { BadRequestFilter } from '../../../api/filter/bad-request.filter'
import { NotFoundFilter } from '../../../api/filter/not-found.filter'
import { GetHabitsQuery } from '../../query/habit/get-habits.query'
import { GetHabitsDTO } from '../../query/habit/get-habits.dto'
import { Habit } from '../../../domain'

@Controller('habits')
export class GetHabitsController {
  private readonly SUCCESS_MESSAGE =
    'The habits has been successfully retrieved.'
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':userId')
  @UseFilters(new BadRequestFilter(), new NotFoundFilter())
  async createHabit(
    @Param() queryParameters: GetHabitsDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const getHabitsQuery = new GetHabitsQuery(queryParameters.userId)
    const habits = await this.queryBus.execute(getHabitsQuery)

    Logger.log(this.SUCCESS_MESSAGE, 'GetHabitsController')
    return response.status(201).json({
      code: 'habits-retrieved-successfully',
      message: this.SUCCESS_MESSAGE,
      data: habits.map((habit: Habit) => JSON.stringify(habit)),
    })
  }
}
