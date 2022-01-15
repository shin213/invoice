import { Module } from '@nestjs/common'
import { RequestsService } from './requests.service'
import { RequestsResolver } from './requests.resolver'

@Module({
  providers: [RequestsService, RequestsResolver],
})
export class RequestsModule {}
