import { Company } from './companies/company'
import { User } from './users/user'
import { InvoiceFormat } from './invoice-formats/invoice-format'
import { InvoiceFormatLog } from './invoice-format-logs/invoice-format-log'
import { InvoiceFormatElement } from './invoice-format-elements/invoice-format-element'
import { Comment } from './comments/comment'
import { Invoice } from './invoices/invoice'
import { Request } from './requests/request'
import { RequestReceiver } from './request-receiver/request-receiver'
import { RequestNotification } from './request-notifications/request-notification'
import { Judgement } from './judgements/judgement'
import { PartnerCompany } from './partner-companies/partner-company'
import { Construction } from './constructions/construction'
import { InvoiceLog } from './invoice-logs/invoice-log'
import TypeOrmNamingStrategy from './type_orm_naming_strategy'

export default {
  type: 'postgres' as const,
  host: process.env.DATABASE_HOST || 'db',
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'dev_sample',
  database: process.env.POSTGRES_DB || 'main_db',
  entities: [
    Company,
    PartnerCompany,
    Construction,
    User,
    InvoiceFormat,
    InvoiceFormatLog,
    InvoiceFormatElement,
    Comment,
    Invoice,
    Request,
    RequestReceiver,
    RequestNotification,
    Judgement,
    InvoiceLog,
  ],
  migrations: ['./src/migrations/*.ts'],
  cli: {
    migrationsDir: './src/migrations',
  },
  synchronize: false,
  namingStrategy: new TypeOrmNamingStrategy(),
}
