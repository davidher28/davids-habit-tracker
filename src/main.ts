import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { BaseErrorFilter } from './api/base.filter'

const APP_PORT = 3010

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new BaseErrorFilter())

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
