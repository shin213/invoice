import { Module } from '@nestjs/common'
import { InvoicesResolver } from './invoices.resolver'
import { InvoicesService } from './invoices.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Invoice } from './invoice'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), UsersModule, CompaniesModule],
  providers: [
    InvoicesResolver,
    InvoicesService,
    UsersService,
    CompaniesService,
  ],
  exports: [InvoicesModule, TypeOrmModule],
})
export class InvoicesModule {}
