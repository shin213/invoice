import { Module } from '@nestjs/common'
import { InvoiceFormatLogsResolver } from './invoice-format-logs.resolver'
import { InvoiceFormatLogsService } from './invoice-format-logs.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFormatLog } from './invoice-format-log'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceFormatLog]),
    UsersModule,
    InvoiceFormatsModule,
  ],
  providers: [
    InvoiceFormatLogsResolver,
    InvoiceFormatLogsService,
    UsersService,
    InvoiceFormatsService,
  ],
})
export class InvoiceFormatLogsModule {}
