import { Test, TestingModule } from '@nestjs/testing'
import { PartnerCompaniesResolver } from './partner-companies.resolver'

describe('PartnerCompanyResolver', () => {
  let resolver: PartnerCompaniesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerCompaniesResolver],
    }).compile()

    resolver = module.get<PartnerCompaniesResolver>(PartnerCompaniesResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
