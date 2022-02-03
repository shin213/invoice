import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { RequestNotificationsModule } from './request-notifications.module'
import { RequestNotificationsResolver } from './request-notifications.resolver'

describe('RequestNotificationsResolver', () => {
  let resolver: RequestNotificationsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), RequestNotificationsModule],
    }).compile()

    resolver = module.get<RequestNotificationsResolver>(
      RequestNotificationsResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
