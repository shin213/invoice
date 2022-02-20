import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InvoiceFormat } from './invoice-format'
import { NewInvoiceFormatInput } from './dto/newInvoiceFormat.input'
import { Company } from 'src/companies/company'
import { CompaniesService } from 'src/companies/companies.service'

@Injectable()
export class InvoiceFormatsService {
  constructor(
    @InjectRepository(InvoiceFormat)
    private formatsRepostiory: Repository<InvoiceFormat>,
    private companyService: CompaniesService,
  ) {}

  findAll(): Promise<InvoiceFormat[]> {
    return this.formatsRepostiory.find()
  }

  findOneById(id: string): Promise<InvoiceFormat> {
    return this.formatsRepostiory.findOne(id)
  }

  async company(companyId: number): Promise<Company> {
    return await this.companyService.findOneById(companyId)
  }

  async create(data: NewInvoiceFormatInput): Promise<InvoiceFormat> {
    const format = this.formatsRepostiory.create(data)
    await this.formatsRepostiory.save(format)
    return format
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.formatsRepostiory.delete(id)
    return result.affected > 0
  }
}
