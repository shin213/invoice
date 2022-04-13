import { Test, TestingModule } from '@nestjs/testing'
import { InvoiceFilesService } from './invoice-files.service'

describe('InvoiceFileService', () => {
  let service: InvoiceFilesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceFilesService],
    }).compile()

    service = module.get<InvoiceFilesService>(InvoiceFilesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
