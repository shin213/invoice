import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Company } from './companies/company'
import { InvoiceFormat } from './invoice-formats/invoice-format'
import { User } from './users/user'
import { InvoiceFormatLog } from './invoice-format-logs/invoice-format-log'
import { Comment } from './comments/comment'
import { Invoice } from './invoices/invoice'
import { Request } from './requests/request'
import { RequestReceiver } from './request-receiver/request-receiver'
import { RequestNotification } from './request-notifications/request-notification'
import { Judgement } from './judgements/judgement'
import { PartnerCompany } from './partner-companies/partner-company'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService()
    return {
      type: 'postgres' as const,
      host: configService.get('DATABASE_HOST', 'db'),
      port: Number(configService.get('DATABASE_PORT', 5432)),
      username: configService.get('POSTGRES_USER', 'admin'),
      password: configService.get<string>('POSTGRES_PASSWORD', 'dev_sample'),
      database: configService.get<string>('POSTGRES_DB', 'main_db'),
      entities: [
        Company,
        PartnerCompany,
        InvoiceFormat,
        User,
        InvoiceFormatLog,
        Comment,
        Invoice,
        Request,
        RequestReceiver,
        RequestNotification,
        Judgement,
      ],
      synchronize: false,
    }
  }
}
