import { Test, TestingModule } from '@nestjs/testing'
import { baseTestImports } from 'src/utils/tests'
import { RequestsModule } from './requests.module'
import { RequestsService } from './requests.service'

describe('RequestsService', () => {
  let service: RequestsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...baseTestImports(), RequestsModule],
    }).compile()

    service = module.get<RequestsService>(RequestsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
