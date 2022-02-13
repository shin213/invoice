import { forwardRef, Module } from '@nestjs/common'
import { RequestsService } from './requests.service'
import { RequestsResolver } from './requests.resolver'
import { Request } from './request'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { RequestReceiverService } from 'src/request-receiver/request-receiver.service'
import { CommentsModule } from 'src/comments/comments.module'
import { CommentsService } from 'src/comments/comments.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    forwardRef(() => RequestReceiverModule),
    forwardRef(() => CommentsModule),
  ],
  providers: [
    RequestsService,
    RequestsResolver,
    RequestReceiverService,
    CommentsService,
  ],
  exports: [RequestsModule, TypeOrmModule],
})
export class RequestsModule {}
