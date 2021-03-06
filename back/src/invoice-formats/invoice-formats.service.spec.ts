import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoiceFormatsModule } from './invoice-formats.module'
import { InvoiceFormatsService } from './invoice-formats.service'

describe('InvoiceFormatsService', () => {
  let service: InvoiceFormatsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoiceFormatsModule],
    }).compile()

    service = module.get<InvoiceFormatsService>(InvoiceFormatsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
