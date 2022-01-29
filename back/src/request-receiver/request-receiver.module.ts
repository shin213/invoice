import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestReceiver } from './request-receiver'
import { RequestReceiverResolver } from './request-receiver.resolver'
import { RequestReceiversService } from './request-receiver.service'

@Module({
  imports: [TypeOrmModule.forFeature([RequestReceiver])],
  providers: [RequestReceiverResolver, RequestReceiversService],
  exports: [RequestReceiverModule, TypeOrmModule],
})
export class RequestReceiverModule {}
