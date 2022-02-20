import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from 'src/companies/company'
import { User } from 'src/users/user'
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

  findOneById(id: string): Promise<Invoice> {
    return this.invoicesRepository.findOne(id)
  }

  async createdBy(invoiceId: string): Promise<User> {
    const invoice = await this.invoicesRepository.findOne(invoiceId, {
      relations: ['created_by'],
    })

    return invoice.createdBy
  }

  async company(invoiceId: string): Promise<Company> {
    const invoice = await this.invoicesRepository.findOne(invoiceId, {
      relations: ['company'],
    })

    return invoice.company
  }

  async create(data: NewInvoiceInput): Promise<Invoice> {
    const invoice = this.invoicesRepository.create(data)
    await this.invoicesRepository.save(invoice)
    return invoice
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.invoicesRepository.delete(id)
    return result.affected > 0
  }
}
