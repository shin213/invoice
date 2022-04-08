import { Test, TestingModule } from '@nestjs/testing'
import { InvoicesResolveService } from './invoices-resolve.service'

describe('InvoicesResolveService', () => {
  let service: InvoicesResolveService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesResolveService],
    }).compile()

    service = module.get<InvoicesResolveService>(InvoicesResolveService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
