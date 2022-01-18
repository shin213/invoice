import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceFormatsLogsResolver } from './invoice-formats-logs.resolver'

describe('InvoiceFormatsLogsResolver', () => {
  let resolver: InvoiceFormatsLogsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceFormatsLogsResolver],
    }).compile()

    resolver = module.get<InvoiceFormatsLogsResolver>(
      InvoiceFormatsLogsResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
