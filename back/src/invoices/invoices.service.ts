import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NewInvoiceInput } from './dto/newInvoice.input'
import { Invoice } from './invoice'

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
  ) {}

  findAll(): Promise<Invoice[]> {
    return this.invoicesRepository.find()
  }

  findOneById(id: number): Promise<Invoice> {
    return this.invoicesRepository.findOne(id)
  }

  async create(data: NewInvoiceInput): Promise<Invoice> {
    const invoice = this.invoicesRepository.create(data)
    await this.invoicesRepository.save(invoice)
    return invoice
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.invoicesRepository.delete(id)
    return result.affected > 0
  }
}
