import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { RequestNotificationsModule } from './request-notifications.module'
import { RequestNotificationsService } from './request-notifications.service'

describe('RequestNotificationsService', () => {
  let service: RequestNotificationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), RequestNotificationsModule],
    }).compile()

    service = module.get<RequestNotificationsService>(
      RequestNotificationsService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
