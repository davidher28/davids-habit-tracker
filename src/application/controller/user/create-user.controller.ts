import { Body, Controller, Logger, Post, Res, UseFilters } from '@nestjs/common'
import { CreateUserCommand } from '../../command/user/create-user.command'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateUserDTO } from '../../command/user/create-user.dto'
import { ConflictRequestFilter } from '../../../api/filter/conflict-request.filter'
import { BadRequestFilter } from '../../../api/filter/bad-request.filter'

@Controller('users')
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseFilters(new BadRequestFilter(), new ConflictRequestFilter())
  async createUser(
    @Body() request: CreateUserDTO,
    @Res() response: Response,
  ): Promise<Response> {
    await this.commandBus.execute(
      new CreateUserCommand(request.userName, request.email, request.fullName),
    )

    const message = 'The user has been successfully created.'
    Logger.log(message, 'CreateUserController')

    return response.status(201).json({
      code: 'user-created',
      message: message,
    })
  }
}
