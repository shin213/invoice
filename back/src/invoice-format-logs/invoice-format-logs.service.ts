import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InvoiceFormatLog } from './invoice-format-log'
import { InvoiceFormat } from 'src/invoice-formats/invoice-format'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'
import { InvoiceFormatElement } from 'src/invoice-format-elements/invoice-format-element'
import { InvoiceFormatElementsService } from 'src/invoice-format-elements/invoice-format-elements.service'
import { InvoiceFormatDetailElement } from 'src/invoice-format-detail-elements/invoice-format-detail-element'
import { InvoiceFormatDetailElementsService } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.service'

@Injectable()
export class InvoiceFormatLogsService {
  constructor(
    @InjectRepository(InvoiceFormatLog)
    private repostiory: Repository<InvoiceFormatLog>,
    private formatsService: InvoiceFormatsService,
    private elementsService: InvoiceFormatElementsService,
    private detailElementsService: InvoiceFormatDetailElementsService,
  ) {}

  findAll(): Promise<InvoiceFormatLog[]> {
    return this.repostiory.find()
  }

  findOneById(id: string): Promise<InvoiceFormatLog | undefined> {
    return this.repostiory.findOne(id)
  }

  async invoiceFormat(formatId: string): Promise<InvoiceFormat | undefined> {
    return await this.formatsService.findOneById(formatId)
  }

  async elements(id: string): Promise<InvoiceFormatElement[]> {
    return await this.elementsService.findByLogId(id)
  }

  async detailElements(id: string): Promise<InvoiceFormatDetailElement[]> {
    return await this.detailElementsService.findByLogId(id)
  }
}
