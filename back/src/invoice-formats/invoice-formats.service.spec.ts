import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceFormatsService } from './invoice-formats.service'

describe('InvoiceFormatsService', () => {
  let service: InvoiceFormatsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceFormatsService],
    }).compile()

    service = module.get<InvoiceFormatsService>(InvoiceFormatsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
