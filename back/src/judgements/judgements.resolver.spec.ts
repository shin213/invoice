import { Test, TestingModule } from '@nestjs/testing'
import { baseTestImports } from 'src/utils/tests'
import { JudgementsModule } from './judgements.module'
import { JudgementsResolver } from './judgements.resolver'

describe('JudgementsResolver', () => {
  let resolver: JudgementsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...baseTestImports(), JudgementsModule],
    }).compile()

    resolver = module.get<JudgementsResolver>(JudgementsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
