import { Test, TestingModule } from '@nestjs/testing'
import { RequestNotificationsResolver } from './request-notifications.resolver'

describe('RequestNotificationsResolver', () => {
  let resolver: RequestNotificationsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestNotificationsResolver],
    }).compile()

    resolver = module.get<RequestNotificationsResolver>(
      RequestNotificationsResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
