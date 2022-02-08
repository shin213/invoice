import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceLogsService } from './invoice-logs.service'

describe('InvoiceLogsService', () => {
  let service: InvoiceLogsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceLogsService],
    }).compile()

    service = module.get<InvoiceLogsService>(InvoiceLogsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
