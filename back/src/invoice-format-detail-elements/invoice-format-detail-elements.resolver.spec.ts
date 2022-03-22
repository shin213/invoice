import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoiceFormatDetailElementsModule } from './invoice-format-detail-elements.module'
import { InvoiceFormatDetailElementsResolver } from './invoice-format-detail-elements.resolver'

describe('InvoiceFormatDetailElementsResolver', () => {
  let resolver: InvoiceFormatDetailElementsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoiceFormatDetailElementsModule],
    }).compile()

    resolver = module.get<InvoiceFormatDetailElementsResolver>(
      InvoiceFormatDetailElementsResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
