import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { CommentsModule } from './comments.module'
import { CommentsResolver } from './comments.resolver'

describe('CommentsResolver', () => {
  let resolver: CommentsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), CommentsModule],
    }).compile()

    resolver = module.get<CommentsResolver>(CommentsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
