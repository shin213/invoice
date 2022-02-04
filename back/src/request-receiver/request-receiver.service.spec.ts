import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { RequestReceiverModule } from './request-receiver.module'
import { RequestReceiverService } from './request-receiver.service'

describe('RequestReceiverService', () => {
  let service: RequestReceiverService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), RequestReceiverModule],
    }).compile()

    service = module.get<RequestReceiverService>(RequestReceiverService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
