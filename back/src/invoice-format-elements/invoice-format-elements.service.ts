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
    return this.repository.find({ invoice_format_log_id: logId })
  }

  findOneById(id: string): Promise<InvoiceFormatElement> {
    return this.repository.findOne(id)
  }
}
