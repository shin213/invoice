import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceFileResolver } from './invoice-file.resolver'

describe('InvoiceFileResolver', () => {
  let resolver: InvoiceFileResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceFileResolver],
    }).compile()

    resolver = module.get<InvoiceFileResolver>(InvoiceFileResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
