import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsResolver } from './comments.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './comment'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { UsersModule } from 'src/users/users.module'
import { RequestsModule } from 'src/requests/requests.module'
import { InvoicesService } from 'src/invoices/invoices.service'
import { UsersService } from 'src/users/users.service'
import { RequestsService } from 'src/requests/requests.service'
import { CompaniesService } from 'src/companies/companies.service'
import { CompaniesModule } from 'src/companies/companies.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    InvoicesModule,
    UsersModule,
    RequestsModule,
    CompaniesModule,
  ],
  providers: [
    CommentsService,
    CommentsResolver,
    InvoicesService,
    UsersService,
    RequestsService,
    CompaniesService,
  ],
  exports: [CommentsModule, TypeOrmModule],
})
export class CommentsModule {}
