import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoiceFormatElementsModule } from './invoice-format-elements.module'
import { InvoiceFormatElementsResolver } from './invoice-format-elements.resolver'

describe('InvoiceFormatElementsResolver', () => {
  let resolver: InvoiceFormatElementsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoiceFormatElementsModule],
    }).compile()

    resolver = module.get<InvoiceFormatElementsResolver>(
      InvoiceFormatElementsResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
