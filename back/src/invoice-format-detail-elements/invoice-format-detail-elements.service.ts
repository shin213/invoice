import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InvoiceFormatDetailElement } from './invoice-format-detail-element'

@Injectable()
export class InvoiceFormatDetailElementsService {
  constructor(
    @InjectRepository(InvoiceFormatDetailElement)
    private repository: Repository<InvoiceFormatDetailElement>,
  ) {}

  findByLogId(logId: string): Promise<InvoiceFormatDetailElement[]> {
    return this.repository.find({ invoiceFormatLogId: logId })
  }

  findOneById(id: string): Promise<InvoiceFormatDetailElement | undefined> {
    return this.repository.findOne(id)
  }
}
