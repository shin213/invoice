import { Test, TestingModule } from '@nestjs/testing'
import { CommentsModule } from 'src/comments/comments.module'
import { testImports } from 'src/utils/tests'
import { RequestNotificationsModule } from './request-notifications.module'
import { RequestNotificationsResolver } from './request-notifications.resolver'

describe('RequestNotificationsResolver', () => {
  let resolver: RequestNotificationsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), CommentsModule, RequestNotificationsModule],
    }).compile()

    resolver = module.get<RequestNotificationsResolver>(
      RequestNotificationsResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
