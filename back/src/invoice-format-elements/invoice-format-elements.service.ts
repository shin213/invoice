import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InvoiceFormatElement } from './invoice-format-element'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'
import { InvoiceFormatLogsService } from 'src/invoice-format-logs/invoice-format-logs.service'

@Injectable()
export class InvoiceFormatElementsService {
  constructor(
    @InjectRepository(InvoiceFormatElement)
    private repository: Repository<InvoiceFormatElement>,
    private logsService: InvoiceFormatLogsService,
  ) {}

  findByLogId(logId: string): Promise<InvoiceFormatElement[]> {
    return this.repository.find({ invoice_format_log_id: logId })
  }

  findOneById(id: string): Promise<InvoiceFormatElement> {
    return this.repository.findOne(id)
  }

  async invoiceFormatLog(logId: string): Promise<InvoiceFormatLog> {
    return await this.logsService.findOneById(logId)
  }
}
