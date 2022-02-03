import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoiceFormatLogsModule } from './invoice-format-logs.module'
import { InvoiceFormatLogsService } from './invoice-format-logs.service'

describe('InvoiceFormatsLogsService', () => {
  let service: InvoiceFormatLogsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoiceFormatLogsModule],
    }).compile()

    service = module.get<InvoiceFormatLogsService>(InvoiceFormatLogsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
