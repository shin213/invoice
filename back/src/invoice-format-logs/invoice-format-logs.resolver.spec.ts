import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceFormatLogsResolver } from './invoice-format-logs.resolver'

describe('InvoiceFormatsLogsResolver', () => {
  let resolver: InvoiceFormatLogsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceFormatLogsResolver],
    }).compile()

    resolver = module.get<InvoiceFormatLogsResolver>(InvoiceFormatLogsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
