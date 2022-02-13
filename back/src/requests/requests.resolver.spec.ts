import { Test, TestingModule } from '@nestjs/testing'
import { CommentsModule } from 'src/comments/comments.module'
import { testImports } from 'src/utils/tests'
import { RequestsModule } from './requests.module'
import { RequestsResolver } from './requests.resolver'

describe('RequestsResolver', () => {
  let resolver: RequestsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), CommentsModule, RequestsModule],
    }).compile()

    resolver = module.get<RequestsResolver>(RequestsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
