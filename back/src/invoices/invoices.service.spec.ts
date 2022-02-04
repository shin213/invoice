import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoicesModule } from './invoices.module'
import { InvoicesService } from './invoices.service'

describe('InvoicesService', () => {
  let service: InvoicesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoicesModule],
    }).compile()

    service = module.get<InvoicesService>(InvoicesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
