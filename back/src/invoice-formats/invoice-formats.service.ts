import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InvoiceFormat } from './invoice-format'
import { NewInvoiceFormatInput } from './dto/newInvoiceFormat.input'

@Injectable()
export class InvoiceFormatsService {
  constructor(
    @InjectRepository(InvoiceFormat)
    private foramtsRepostiory: Repository<InvoiceFormat>,
  ) {}

  findAll(): Promise<InvoiceFormat[]> {
    return this.foramtsRepostiory.find()
  }

  findOneById(id: number): Promise<InvoiceFormat> {
    return this.foramtsRepostiory.findOne(id)
  }

  async create(data: NewInvoiceFormatInput): Promise<InvoiceFormat> {
    const format = this.foramtsRepostiory.create(data)
    await this.foramtsRepostiory.save(format)
    return format
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.foramtsRepostiory.delete(id)
    return result.affected > 0
  }
}
