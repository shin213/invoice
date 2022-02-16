import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InvoiceFormatLog } from './invoice-format-log'
import { NewInvoiceFormatInputLog } from './dto/newInvoiceFormatLog.input'
import { InvoiceFormat } from 'src/invoice-formats/invoice-format'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'

@Injectable()
export class InvoiceFormatLogsService {
  constructor(
    @InjectRepository(InvoiceFormatLog)
    private logsRepostiory: Repository<InvoiceFormatLog>,
    private formatsService: InvoiceFormatsService,
  ) {}

  findAll(): Promise<InvoiceFormatLog[]> {
    return this.logsRepostiory.find()
  }

  findOneById(id: string): Promise<InvoiceFormatLog> {
    return this.logsRepostiory.findOne(id)
  }

  async invoice_format(foramt_id: string): Promise<InvoiceFormat> {
    return await this.formatsService.findOneById(foramt_id)
  }

  async create(data: NewInvoiceFormatInputLog): Promise<InvoiceFormatLog> {
    const format = this.logsRepostiory.create(data)
    await this.logsRepostiory.save(format)
    return format
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.logsRepostiory.delete(id)
    return result.affected > 0
  }
}
