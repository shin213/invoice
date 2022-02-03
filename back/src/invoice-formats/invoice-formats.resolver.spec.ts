import { Test, TestingModule } from '@nestjs/testing'
import { baseTestImports } from 'src/utils/tests'
import { InvoiceFormatsModule } from './invoice-formats.module'
import { InvoiceFormatsResolver } from './invoice-formats.resolver'

describe('InvoiceFormatsResolver', () => {
  let resolver: InvoiceFormatsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...baseTestImports(), InvoiceFormatsModule],
    }).compile()

    resolver = module.get<InvoiceFormatsResolver>(InvoiceFormatsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
