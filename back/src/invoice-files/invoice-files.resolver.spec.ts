import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceFilesResolver } from './invoice-files.resolver'

describe('InvoiceFileResolver', () => {
  let resolver: InvoiceFilesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceFilesResolver],
    }).compile()

    resolver = module.get<InvoiceFilesResolver>(InvoiceFilesResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
