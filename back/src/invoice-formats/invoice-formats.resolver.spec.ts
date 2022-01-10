import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceFormatsResolver } from './invoice-formats.resolver'

describe('InvoiceFormatsResolver', () => {
  let resolver: InvoiceFormatsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceFormatsResolver],
    }).compile()

    resolver = module.get<InvoiceFormatsResolver>(InvoiceFormatsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
