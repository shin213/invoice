import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoiceFormatDetailElementsModule } from './invoice-format-detail-elements.module'
import { InvoiceFormatDetailElementsService } from './invoice-format-detail-elements.service'

describe('InvoiceFormatDetailElementsService', () => {
  let service: InvoiceFormatDetailElementsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoiceFormatDetailElementsModule],
    }).compile()

    service = module.get<InvoiceFormatDetailElementsService>(
      InvoiceFormatDetailElementsService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
