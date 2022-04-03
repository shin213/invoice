import { Test, TestingModule } from '@nestjs/testing'
import { InvoicesTransferResolver } from './invoices-transfer.resolver'

describe('InvoicesTransferResolver', () => {
  let resolver: InvoicesTransferResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesTransferResolver],
    }).compile()

    resolver = module.get<InvoicesTransferResolver>(InvoicesTransferResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
