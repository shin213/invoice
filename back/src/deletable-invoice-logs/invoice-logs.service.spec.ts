import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoiceLogsModule } from './invoice-logs.module'
import { InvoiceLogsService } from './invoice-logs.service'

describe('InvoiceLogsService', () => {
  let service: InvoiceLogsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoiceLogsModule],
    }).compile()

    service = module.get<InvoiceLogsService>(InvoiceLogsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
