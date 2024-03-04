import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

const APP_PORT = 3010

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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
