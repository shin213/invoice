import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceFormatLogsService } from './invoice-format-logs.service'

describe('InvoiceFormatsLogsService', () => {
  let service: InvoiceFormatLogsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceFormatLogsService],
    }).compile()

    service = module.get<InvoiceFormatLogsService>(InvoiceFormatLogsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
