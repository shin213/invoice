import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsResolver } from './comments.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './comment'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { UsersModule } from 'src/users/users.module'
import { RequestsModule } from 'src/requests/requests.module'
import { CompaniesModule } from 'src/companies/companies.module'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    InvoicesModule,
    UnconfirmedUsersModule,
    CognitoModule,
    UsersModule,
    RequestReceiverModule,
    RequestsModule,
    CompaniesModule,
  ],
  providers: [CommentsService, CommentsResolver],
  exports: [CommentsModule, CommentsService, TypeOrmModule],
})
export class CommentsModule {}
