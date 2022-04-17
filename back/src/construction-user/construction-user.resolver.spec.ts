import { Test, TestingModule } from '@nestjs/testing'
import { ConstructionUserResolver } from './construction-user.resolver'

describe('ConstructionUserResolver', () => {
  let resolver: ConstructionUserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstructionUserResolver],
    }).compile()

    resolver = module.get<ConstructionUserResolver>(ConstructionUserResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
