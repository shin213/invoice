import { Test, TestingModule } from '@nestjs/testing'
import { CommentsModule } from 'src/comments/comments.module'
import { testImports } from 'src/utils/tests'
import { RequestNotificationsModule } from './request-notifications.module'
import { RequestNotificationsService } from './request-notifications.service'

describe('RequestNotificationsService', () => {
  let service: RequestNotificationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), CommentsModule, RequestNotificationsModule],
    }).compile()

    service = module.get<RequestNotificationsService>(
      RequestNotificationsService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
