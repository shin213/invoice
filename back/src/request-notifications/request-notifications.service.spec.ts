import { Test, TestingModule } from '@nestjs/testing'
import { RequestNotificationsService } from './request-notifications.service'

describe('RequestNotificationsService', () => {
  let service: RequestNotificationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestNotificationsService],
    }).compile()

    service = module.get<RequestNotificationsService>(
      RequestNotificationsService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
