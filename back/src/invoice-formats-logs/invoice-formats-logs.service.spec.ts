import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceFormatsLogsService } from './invoice-formats-logs.service'

describe('InvoiceFormatsLogsService', () => {
  let service: InvoiceFormatsLogsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceFormatsLogsService],
    }).compile()

    service = module.get<InvoiceFormatsLogsService>(InvoiceFormatsLogsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
