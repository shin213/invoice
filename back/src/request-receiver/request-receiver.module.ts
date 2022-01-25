import { Module } from '@nestjs/common'
import { RequestReceiverResolver } from './request-receiver.resolver'
import { RequestReceiverService } from './request-receiver.service'

@Module({
  providers: [RequestReceiverResolver, RequestReceiverService],
})
export class RequestReceiverModule {}
