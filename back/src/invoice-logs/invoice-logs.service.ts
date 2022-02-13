import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InvoiceLog } from './invoice-log'
import { NewInvoiceLogInputLog } from './dto/newInvoiceLog.input'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'
import { InvoiceFormatLogsService } from 'src/invoice-format-logs/invoice-format-logs.service'

@Injectable()
export class InvoiceLogsService {
  constructor(
    @InjectRepository(InvoiceLog)
    private logsRepostiory: Repository<InvoiceLog>,
    private formatsLogService: InvoiceFormatLogsService,
  ) {}

  findAll(): Promise<InvoiceLog[]> {
    return this.logsRepostiory.find()
  }

  findOneById(id: string): Promise<InvoiceLog> {
    return this.logsRepostiory.findOne(id)
  }

  async invoiceFormatLog(foramtsLogId: string): Promise<InvoiceFormatLog> {
    return await this.formatsLogService.findOneById(foramtsLogId)
  }

  async create(data: NewInvoiceLogInputLog): Promise<InvoiceLog> {
    const log = this.logsRepostiory.create(data)
    await this.logsRepostiory.save(log)
    return log
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.logsRepostiory.delete(id)
    return result.affected > 0
  }
}