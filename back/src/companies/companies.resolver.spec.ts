import { Test, TestingModule } from '@nestjs/testing'
import { baseTestImports } from 'src/utils/tests'
import { CompaniesModule } from './companies.module'
import { CompaniesResolver } from './companies.resolver'

describe('CompaniesResolver', () => {
  let resolver: CompaniesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...baseTestImports(), CompaniesModule],
    }).compile()

    resolver = module.get<CompaniesResolver>(CompaniesResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
