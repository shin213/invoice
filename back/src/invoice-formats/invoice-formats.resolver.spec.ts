import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoiceFormatsModule } from './invoice-formats.module'
import { InvoiceFormatsResolver } from './invoice-formats.resolver'

describe('InvoiceFormatsResolver', () => {
  let resolver: InvoiceFormatsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoiceFormatsModule],
    }).compile()

    resolver = module.get<InvoiceFormatsResolver>(InvoiceFormatsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
