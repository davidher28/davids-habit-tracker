import { Body, Controller, Post, Res } from '@nestjs/common'
import { CreateUserCommand } from '../application/command/user/create-user.command'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from './error.handler'
import { CommandBus } from '@nestjs/cqrs'

export class CreateUserDto {
  userName: string
  fullName: string
}

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createUser(
    @Body() request: CreateUserDto,
    @Res() response: Response,
  ): Promise<Response> {
    const id = uuidv4()

    // TODO: Implement an ExceptionFilter to handle this
    try {
      await this.commandBus.execute(
        new CreateUserCommand(id, request.userName, request.fullName),
      )
    } catch (error) {
      catchError(error, response)
      return
    }

    return response.status(201).json({
      code: 'user-created',
      message: 'The user has been successfully created.',
    })
  }
}
