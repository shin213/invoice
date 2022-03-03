import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoiceFormatElementsModule } from './invoice-format-elements.module'
import { InvoiceFormatElementsService } from './invoice-format-elements.service'

describe('InvoiceFormatElementsService', () => {
  let service: InvoiceFormatElementsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoiceFormatElementsModule],
    }).compile()

    service = module.get<InvoiceFormatElementsService>(
      InvoiceFormatElementsService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
