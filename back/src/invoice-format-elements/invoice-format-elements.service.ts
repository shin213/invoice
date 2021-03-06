import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InvoiceFormatElement } from './invoice-format-element'

@Injectable()
export class InvoiceFormatElementsService {
  constructor(
    @InjectRepository(InvoiceFormatElement)
    private repository: Repository<InvoiceFormatElement>,
  ) {}

  findByLogId(logId: string): Promise<InvoiceFormatElement[]> {
    return this.repository.find({ invoiceFormatLogId: logId })
  }

  findOneById(id: string): Promise<InvoiceFormatElement | undefined> {
    return this.repository.findOne(id)
  }
}
