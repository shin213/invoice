import { Test, TestingModule } from '@nestjs/testing'
import { ConstructionsResolver } from './constructions.resolver'

describe('ConstructionResolver', () => {
  let resolver: ConstructionsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstructionsResolver],
    }).compile()

    resolver = module.get<ConstructionsResolver>(ConstructionsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
