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

  findOneById(id: number): Promise<Invoice> {
    return this.invoicesRepository.findOne(id)
  }

  async created_by(invoice_id: number): Promise<User> {
    const invoice = await this.invoicesRepository.findOne(invoice_id, {
      relations: ['created_by'],
    })

    return invoice.created_by
  }

  async company(invoice_id: number): Promise<Company> {
    const invoice = await this.invoicesRepository.findOne(invoice_id, {
      relations: ['company'],
    })

    return invoice.company
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
