import { forwardRef, Module } from '@nestjs/common'
import { RequestsService } from './requests.service'
import { RequestsResolver } from './requests.resolver'
import { Request } from './request'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { RequestReceiverService } from 'src/request-receiver/request-receiver.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    forwardRef(() => RequestReceiverModule),
  ],
  providers: [RequestsService, RequestsResolver, RequestReceiverService],
  exports: [RequestsModule, TypeOrmModule],
})
export class RequestsModule {}
