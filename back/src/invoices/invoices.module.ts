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
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    CognitoModule,
    UnconfirmedUsersModule,
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
  exports: [InvoicesModule, InvoicesService, TypeOrmModule],
})
export class InvoicesModule {}
