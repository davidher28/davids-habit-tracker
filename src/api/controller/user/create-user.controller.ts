import { Body, Controller, Logger, Post, Res, UseFilters } from '@nestjs/common'
import { CreateUserCommand } from '../../../application/command/user/create-user.command'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateUserDTO } from './create-user.dto'
import { ConflictFilter } from '../../filter/conflict.filter'
import { BadRequestFilter } from '../../filter/bad-request.filter'

@Controller('users')
export class CreateUserController {
  private readonly SUCCESS_MESSAGE = 'The user has been successfully created.'
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseFilters(new BadRequestFilter(), new ConflictFilter())
  async createUser(
    @Body() request: CreateUserDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const newUserCommand = new CreateUserCommand(
      request.userName,
      request.email,
      request.fullName,
    )
    await this.commandBus.execute(newUserCommand)

    Logger.log(this.SUCCESS_MESSAGE, 'CreateUserController')
    return response.status(201).json({
      code: 'user-created',
      message: this.SUCCESS_MESSAGE,
    })
  }
}
