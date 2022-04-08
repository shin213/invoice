import { Test, TestingModule } from '@nestjs/testing'
import { InvoicesResolveResolver } from './invoices-resolve.resolver'

describe('InvoicesResolveResolver', () => {
  let resolver: InvoicesResolveResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesResolveResolver],
    }).compile()

    resolver = module.get<InvoicesResolveResolver>(InvoicesResolveResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
