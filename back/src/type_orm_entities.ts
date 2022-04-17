import { Company } from './companies/company'
import { Comment } from './comments/comment'
import { Construction } from './constructions/construction'
import { InvoiceFile } from './invoice-files/invoice-file'
import { InvoiceFormatDetailElement } from './invoice-format-detail-elements/invoice-format-detail-element'
import { InvoiceFormatElement } from './invoice-format-elements/invoice-format-element'
import { InvoiceFormatLog } from './invoice-format-logs/invoice-format-log'
import { InvoiceFormat } from './invoice-formats/invoice-format'
import { Invoice } from './invoices/invoice'
import { Judgement } from './judgements/judgement'
import { PartnerCompany } from './partner-companies/partner-company'
import { Request } from './requests/request'
import { RequestNotification } from './request-notifications/request-notification'
import { RequestReceiver } from './request-receiver/request-receiver'
import { UnconfirmedUser } from './unconfirmed-users/unconfirmed-user'
import { User } from './users/user'

export const typeOrmEntities = [
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
]
