import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

const APP_PORT = 3010

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // TODO: Review if it's worth it to implement validation pipes for each endpoint
  app.useGlobalPipes(new ValidationPipe())
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
