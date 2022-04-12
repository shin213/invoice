import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from 'src/companies/company'
import { Construction } from 'src/constructions/construction'
import { InvoiceFile } from 'src/invoice-files/invoice-file'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'
import { InvoiceFormatLogsService } from 'src/invoice-format-logs/invoice-format-logs.service'
import { User } from 'src/users/user'
import { Repository } from 'typeorm'
import { NewInvoiceInput } from './dto/newInvoice.input'
import { UpdateInvoiceInput } from './dto/updateInvoice.input'
import { Invoice, InvoiceStatus } from './invoice'

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    private formatsLogService: InvoiceFormatLogsService,
  ) {}

  findAll(companyId: number): Promise<Invoice[]> {
    return this.invoicesRepository.find({
      where: {
        companyId,
      },
    })
  }

  findOneById(id: string): Promise<Invoice | undefined> {
    return this.invoicesRepository.findOne(id)
  }

  findByStatus(companyId: number, status: InvoiceStatus): Promise<Invoice[]> {
    return this.invoicesRepository.find({
      status,
      companyId,
    })
  }

  async createdBy(invoiceId: string): Promise<User> {
    const invoice = await this.invoicesRepository.findOne(invoiceId, {
      relations: ['createdBy'],
    })
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }

    return invoice.createdBy
  }

  async company(invoiceId: string): Promise<Company> {
    const invoice = await this.invoicesRepository.findOne(invoiceId, {
      relations: ['company'],
    })
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }

    return invoice.company
  }

  async construction(invoiceId: string): Promise<Construction | undefined> {
    const invoice = await this.invoicesRepository.findOne(invoiceId, {
      relations: ['construction'],
    })
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }

    return invoice.construction ?? undefined
  }

  async invoiceFormatLog(
    formatsLogId: string,
  ): Promise<InvoiceFormatLog | undefined> {
    return await this.formatsLogService.findOneById(formatsLogId)
  }

  async invoiceFiles(invoiceId: string): Promise<InvoiceFile[]> {
    const invoice = await this.invoicesRepository.findOne(invoiceId, {
      relations: ['invoiceFiles'],
    })
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    return invoice.invoiceFiles
  }

  async create(currentUser: User, data: NewInvoiceInput): Promise<Invoice> {
    const invoice = this.invoicesRepository.create({
      ...data,
      createdById: currentUser.id,
      companyId: currentUser.companyId,
      status: InvoiceStatus.inputtingWithSystem,
    })
    await this.invoicesRepository.save(invoice)
    return invoice
  }

  async update(input: UpdateInvoiceInput): Promise<Invoice> {
    const invoice = await this.findOneById(input.id)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    if (invoice.status !== InvoiceStatus.inputtingWithSystem) {
      throw new HttpException(
        'Invoice is not inputting',
        HttpStatus.BAD_REQUEST,
      )
    }
    invoice.body = input.body
    const updated = await this.invoicesRepository.save(invoice)
    return updated
  }

  async updateStatusLock(invoiceId: string): Promise<Invoice> {
    const invoice = await this.findOneById(invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    if (invoice.status !== InvoiceStatus.inputtingWithSystem) {
      throw new HttpException(
        'Invoice is not inputting',
        HttpStatus.BAD_REQUEST,
      )
    }
    const _invoice = {
      ...invoice,
      status: InvoiceStatus.awaitingReceipt,
      // updatedDataAt: undefined, // TODO: updatedDataAt をdefault値で更新する
    }
    const updated = await this.invoicesRepository.save(_invoice)
    return updated
  }

  async updateStatus(
    invoiceId: string,
    status:
      | InvoiceStatus.awaitingReceipt
      | InvoiceStatus.underApproval
      | InvoiceStatus.declinedToSystem
      | InvoiceStatus.declinedToFile,
  ): Promise<Invoice> {
    const invoice = await this.findOneById(invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    invoice.status = status
    const updated = await this.invoicesRepository.save(invoice)
    return updated
  }

  async complete(invoiceId: string): Promise<Invoice> {
    const invoice = await this.findOneById(invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    invoice.status = InvoiceStatus.completelyApproved
    const updated = await this.invoicesRepository.save(invoice)
    return updated
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.invoicesRepository.delete(id)
    const affected = result.affected
    return affected != null && affected > 0
  }
}
