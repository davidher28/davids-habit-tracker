import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common'
import { CreateUserCommand } from '../../../application/command/user/create-user.command'
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateUserDTO } from './create-user.dto'

@Controller('users')
export class CreateUserController {
  static successCode: string = 'user-created'
  static successMessage: string = 'The user has been successfully created.'

  constructor(private readonly commandBus: CommandBus) {}

  @Post()
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

    Logger.log(CreateUserController.successMessage, CreateUserController.name)
    return response.status(HttpStatus.CREATED).json({
      code: CreateUserController.successCode,
      message: CreateUserController.successMessage,
    })
  }
}
