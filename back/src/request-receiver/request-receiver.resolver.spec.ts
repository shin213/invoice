import { Test, TestingModule } from '@nestjs/testing'
import { RequestReceiverResolver } from './request-receiver.resolver'

describe('RequestReceiverResolver', () => {
  let resolver: RequestReceiverResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestReceiverResolver],
    }).compile()

    resolver = module.get<RequestReceiverResolver>(RequestReceiverResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
