import { forwardRef, Module } from '@nestjs/common'
import { RequestsService } from './requests.service'
import { RequestsResolver } from './requests.resolver'
import { Request } from './request'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { CommentsModule } from 'src/comments/comments.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    forwardRef(() => RequestReceiverModule),
    forwardRef(() => CommentsModule),
  ],
  providers: [RequestsService, RequestsResolver],
  exports: [RequestsModule, RequestsService, TypeOrmModule],
})
export class RequestsModule {}
