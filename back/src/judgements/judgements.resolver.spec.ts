import { Test, TestingModule } from '@nestjs/testing'
import { JudgementsResolver } from './judgements.resolver'

describe('JudgementsResolver', () => {
  let resolver: JudgementsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JudgementsResolver],
    }).compile()

    resolver = module.get<JudgementsResolver>(JudgementsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
