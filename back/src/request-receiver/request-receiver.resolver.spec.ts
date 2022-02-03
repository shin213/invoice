import { Test, TestingModule } from '@nestjs/testing'
import { baseTestImports } from 'src/utils/tests'
import { RequestReceiverModule } from './request-receiver.module'
import { RequestReceiverResolver } from './request-receiver.resolver'

describe('RequestReceiverResolver', () => {
  let resolver: RequestReceiverResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...baseTestImports(), RequestReceiverModule],
    }).compile()

    resolver = module.get<RequestReceiverResolver>(RequestReceiverResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
