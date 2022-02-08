import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoiceLogsModule } from './invoice-logs.module'
import { InvoiceLogsResolver } from './invoice-logs.resolver'

describe('InvoiceLogsResolver', () => {
  let resolver: InvoiceLogsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoiceLogsModule],
    }).compile()

    resolver = module.get<InvoiceLogsResolver>(InvoiceLogsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
