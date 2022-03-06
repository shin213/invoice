import { Test, TestingModule } from '@nestjs/testing'
import { CommentsModule } from 'src/comments/comments.module'
import { testImports } from 'src/utils/tests'
import { RequestReceiverModule } from './request-receiver.module'
import { RequestReceiverResolver } from './request-receiver.resolver'

describe('RequestReceiverResolver', () => {
  let resolver: RequestReceiverResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), CommentsModule, RequestReceiverModule],
    }).compile()

    resolver = module.get<RequestReceiverResolver>(RequestReceiverResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
