import { Module } from '@nestjs/common'
import { JudgementsService } from './judgements.service'
import { JudgementsResolver } from './judgements.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Judgement } from './judgement'
import { UsersModule } from 'src/users/users.module'
import { CommentsModule } from 'src/comments/comments.module'
import { RequestsModule } from 'src/requests/requests.module'
import { CompaniesModule } from 'src/companies/companies.module'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Judgement]),
    UnconfirmedUsersModule,
    UsersModule,
    CommentsModule,
    RequestReceiverModule,
    RequestsModule,
    CompaniesModule,
    InvoicesModule,
  ],
  providers: [JudgementsService, JudgementsResolver],
  exports: [JudgementsModule, JudgementsService, TypeOrmModule],
})
export class JudgementsModule {}
