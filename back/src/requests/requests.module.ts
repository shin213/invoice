import { Module } from '@nestjs/common'
import { RequestsService } from './requests.service'
import { RequestsResolver } from './requests.resolver'
import { Request } from './request'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from 'src/users/users.module'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { CompaniesModule } from 'src/companies/companies.module'
import { UsersService } from 'src/users/users.service'
import { InvoicesService } from 'src/invoices/invoices.service'
import { CompaniesService } from 'src/companies/companies.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    UsersModule,
    InvoicesModule,
    CompaniesModule,
  ],
  providers: [
    RequestsService,
    RequestsResolver,
    UsersService,
    InvoicesService,
    CompaniesService,
  ],
  exports: [RequestsModule, TypeOrmModule],
})
export class RequestsModule {}
