import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Company } from './companies/company'
import { User } from './users/user'
import { InvoiceFormat } from './invoice-formats/invoice-format'
import { InvoiceFormatLog } from './invoice-format-logs/invoice-format-log'
import { InvoiceFormatDetailElement } from './invoice-format-detail-elements/invoice-format-detail-element'
import { InvoiceFormatElement } from './invoice-format-elements/invoice-format-element'
import { Comment } from './comments/comment'
import { Invoice } from './invoices/invoice'
import { Request } from './requests/request'
import { RequestReceiver } from './request-receiver/request-receiver'
import { RequestNotification } from './request-notifications/request-notification'
import { Judgement } from './judgements/judgement'
import { PartnerCompany } from './partner-companies/partner-company'
import { Construction } from './constructions/construction'
import TypeOrmNamingStrategy from './type_orm_naming_strategy'
import { UnconfirmedUser } from './unconfirmed-users/unconfirmed-user'
import { InvoiceFile } from './invoice-files/invoice-file'

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
        Construction,
        User,
        InvoiceFormat,
        InvoiceFormatLog,
        InvoiceFormatDetailElement,
        InvoiceFormatElement,
        Comment,
        Invoice,
        InvoiceFile,
        Request,
        RequestReceiver,
        RequestNotification,
        Judgement,
        UnconfirmedUser,
      ],
      synchronize: false,
      namingStrategy: new TypeOrmNamingStrategy(),
    }
  }
}
