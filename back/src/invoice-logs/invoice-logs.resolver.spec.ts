import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceLogsResolver } from './invoice-logs.resolver'

describe('InvoiceLogsResolver', () => {
  let resolver: InvoiceLogsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceLogsResolver],
    }).compile()

    resolver = module.get<InvoiceLogsResolver>(InvoiceLogsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
