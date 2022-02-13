import { Module } from '@nestjs/common'
import { JudgementsService } from './judgements.service'
import { JudgementsResolver } from './judgements.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Judgement } from './judgement'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { CommentsModule } from 'src/comments/comments.module'
import { CommentsService } from 'src/comments/comments.service'
import { RequestsService } from 'src/requests/requests.service'
import { RequestsModule } from 'src/requests/requests.module'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { InvoicesService } from 'src/invoices/invoices.service'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { RequestReceiverService } from 'src/request-receiver/request-receiver.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Judgement]),
    UsersModule,
    CommentsModule,
    RequestReceiverModule,
    RequestsModule,
    CompaniesModule,
    InvoicesModule,
  ],
  providers: [
    JudgementsService,
    JudgementsResolver,
    UsersService,
    RequestReceiverService,
    CommentsService,
    RequestsService,
    CompaniesService,
    InvoicesService,
  ],
  exports: [JudgementsModule, TypeOrmModule],
})
export class JudgementsModule {}
