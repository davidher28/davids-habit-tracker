import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'

const APP_PORT = 3010

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const firstConstraint = Object.values(
          validationErrors[0].constraints,
        )[0]
        return new BadRequestException(firstConstraint)
      },
    }),
  )
  await app.listen(APP_PORT)
}

bootstrap().then(
  () => {
    Logger.log(
      `Application started and listening on port ${APP_PORT}`,
      'Startup',
    )
  },
  (error) => {
    Logger.error(`Application failed to start: ${error}`, '', 'Startup')
  },
)
