import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { graphqlUploadExpress } from 'graphql-upload'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.use(graphqlUploadExpress({ maxFileSize: 1024 * 1024 * 500, maxFiles: 1 }))
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
