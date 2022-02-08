import { Test, TestingModule } from '@nestjs/testing'
import { PartnerCompanyResolver } from './partner-companies.resolver'

describe('PartnerCompanyResolver', () => {
  let resolver: PartnerCompanyResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerCompanyResolver],
    }).compile()

    resolver = module.get<PartnerCompanyResolver>(PartnerCompanyResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
