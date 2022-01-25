import { Test, TestingModule } from '@nestjs/testing'
import { RequestReceiverService } from './request-receiver.service'

describe('RequestReceiverService', () => {
  let service: RequestReceiverService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestReceiverService],
    }).compile()

    service = module.get<RequestReceiverService>(RequestReceiverService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
