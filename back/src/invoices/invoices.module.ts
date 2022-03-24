import { Module } from '@nestjs/common'
import { InvoicesResolver } from './invoices.resolver'
import { InvoicesService } from './invoices.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Invoice } from './invoice'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { ConstructionsModule } from 'src/constructions/constructions.module'
import { ConstructionsService } from 'src/constructions/constructions.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    UsersModule,
    CompaniesModule,
    ConstructionsModule,
  ],
  providers: [
    InvoicesResolver,
    InvoicesService,
    UsersService,
    CompaniesService,
    ConstructionsService,
  ],
  exports: [InvoicesModule, TypeOrmModule],
})
export class InvoicesModule {}
