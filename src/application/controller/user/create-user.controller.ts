import { Body, Controller, Logger, Post, Res, UseFilters } from '@nestjs/common'
import { CreateUserCommand } from '../../command/user/create-user.command'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateUserDTO } from '../../command/user/create-user.dto'
import { UserAlreadyExistsFilter } from '../../../api/user/user-already-exists.filter'

@Controller('users')
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseFilters(new UserAlreadyExistsFilter())
  async createUser(
    @Body() request: CreateUserDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const id = uuidv4()

    await this.commandBus.execute(
      new CreateUserCommand(
        id,
        request.userName,
        request.email,
        request.fullName,
      ),
    )

    Logger.log(
      `The user has been successfully created with ID: ${id}`,
      'CreateUserController',
    )

    return response.status(201).json({
      code: 'user-created',
      message: 'The user has been successfully created.',
    })
  }
}
