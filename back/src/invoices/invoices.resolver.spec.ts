import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { InvoicesModule } from './invoices.module'
import { InvoicesResolver } from './invoices.resolver'

describe('InvoicesResolver', () => {
  let resolver: InvoicesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), InvoicesModule],
    }).compile()

    resolver = module.get<InvoicesResolver>(InvoicesResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
