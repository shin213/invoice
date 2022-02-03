import { Test, TestingModule } from '@nestjs/testing'
import { baseTestImports } from 'src/utils/tests'
import { RequestNotificationsModule } from './request-notifications.module'
import { RequestNotificationsResolver } from './request-notifications.resolver'

describe('RequestNotificationsResolver', () => {
  let resolver: RequestNotificationsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...baseTestImports(), RequestNotificationsModule],
    }).compile()

    resolver = module.get<RequestNotificationsResolver>(
      RequestNotificationsResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
