import { Injectable } from '@nestjs/common'
import { RequestPair } from 'src/common/invoice-status'
import { Company } from 'src/companies/company'
import { Construction } from 'src/constructions/construction'
import { InvoiceFile } from 'src/invoice-files/invoice-file'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'
import { InvoicesTransferService } from 'src/invoices-transfer/invoices-transfer.service'
import { Invoice, InvoiceStatus } from 'src/invoices/invoice'
import { InvoicesService } from 'src/invoices/invoices.service'
import { Request } from 'src/requests/request'
import { User } from 'src/users/user'
import { NewInvoiceInput } from '../invoices/dto/newInvoice.input'
import { UpdateInvoiceInput } from '../invoices/dto/updateInvoice.input'

@Injectable()
export class InvoicesResolveService {
  constructor(
    private invoicesService: InvoicesService,
    private transferService: InvoicesTransferService,
  ) {}

  findAll(companyId: number): Promise<Invoice[]> {
    return this.invoicesService.findAll(companyId)
  }

  findOneById(id: string): Promise<Invoice | undefined> {
    return this.invoicesService.findOneById(id)
  }

  createdBy(id: string): Promise<User> {
    return this.invoicesService.createdBy(id)
  }

  company(id: string): Promise<Company> {
    return this.invoicesService.company(id)
  }

  construction(id: string): Promise<Construction | undefined> {
    return this.invoicesService.construction(id)
  }

  invoiceFormatLog(id: string): Promise<InvoiceFormatLog | undefined> {
    return this.invoicesService.invoiceFormatLog(id)
  }

  invoiceFiles(id: string): Promise<InvoiceFile[]> {
    return this.invoicesService.invoiceFiles(id)
  }

  findByStatus(companyId: number, status: InvoiceStatus): Promise<Invoice[]> {
    return this.invoicesService.findByStatus(companyId, status)
  }

  requests(id: string): Promise<Request[]> {
    return this.invoicesService.requests(id)
  }

  requestPair(user: User, invoice: Invoice): Promise<RequestPair> {
    return this.transferService.requestPair(user, invoice)
  }

  create(user: User, newInvoice: NewInvoiceInput): Promise<Invoice> {
    return this.invoicesService.create(user, newInvoice)
  }

  update(input: UpdateInvoiceInput): Promise<Invoice> {
    return this.invoicesService.update(input)
  }
}
