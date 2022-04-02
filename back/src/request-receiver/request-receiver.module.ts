import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { RequestsModule } from 'src/requests/requests.module'
import { RequestReceiver } from './request-receiver'
import { RequestReceiverResolver } from './request-receiver.resolver'
import { RequestReceiverService } from './request-receiver.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestReceiver]),
    forwardRef(() => RequestsModule),
    CognitoModule,
  ],
  providers: [RequestReceiverResolver, RequestReceiverService],
  exports: [RequestReceiverModule, RequestReceiverService, TypeOrmModule],
})
export class RequestReceiverModule {}
