import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceFileService } from './invoice-file.service'

describe('InvoiceFileService', () => {
  let service: InvoiceFileService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceFileService],
    }).compile()

    service = module.get<InvoiceFileService>(InvoiceFileService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
