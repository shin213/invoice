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
    private foramtsRepostiory: Repository<InvoiceFormat>,
    private companyService: CompaniesService,
  ) {}

  findAll(): Promise<InvoiceFormat[]> {
    return this.foramtsRepostiory.find()
  }

  findOneById(id: string): Promise<InvoiceFormat> {
    return this.foramtsRepostiory.findOne(id)
  }

  async company(companyId: number): Promise<Company> {
    return await this.companyService.findOneById(companyId)
  }

  async create(data: NewInvoiceFormatInput): Promise<InvoiceFormat> {
    const format = this.foramtsRepostiory.create(data)
    await this.foramtsRepostiory.save(format)
    return format
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.foramtsRepostiory.delete(id)
    return result.affected > 0
  }
}
