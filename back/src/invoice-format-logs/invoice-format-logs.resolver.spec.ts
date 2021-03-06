import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoiceFormatLogsModule } from './invoice-format-logs.module'
import { InvoiceFormatLogsResolver } from './invoice-format-logs.resolver'

describe('InvoiceFormatsLogsResolver', () => {
  let resolver: InvoiceFormatLogsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoiceFormatLogsModule],
    }).compile()

    resolver = module.get<InvoiceFormatLogsResolver>(InvoiceFormatLogsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
