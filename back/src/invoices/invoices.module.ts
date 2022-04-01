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
import { InvoiceFormatLogsModule } from 'src/invoice-format-logs/invoice-format-logs.module'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatElementsModule } from 'src/invoice-format-elements/invoice-format-elements.module'
import { InvoiceFormatDetailElementsModule } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    CognitoModule,
    UnconfirmedUsersModule,
    UsersModule,
    CompaniesModule,
    ConstructionsModule,
    InvoiceFormatLogsModule,
    InvoiceFormatsModule,
    InvoiceFormatElementsModule,
    InvoiceFormatDetailElementsModule,
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
