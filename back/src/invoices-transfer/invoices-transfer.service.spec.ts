import { Test, TestingModule } from '@nestjs/testing'
import { InvoicesTransferService } from './invoices-transfer.service'

describe('InvoiceTransferService', () => {
  let service: InvoicesTransferService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesTransferService],
    }).compile()

    service = module.get<InvoicesTransferService>(InvoicesTransferService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
