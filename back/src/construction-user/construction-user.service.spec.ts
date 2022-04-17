import { Test, TestingModule } from '@nestjs/testing'
import { ConstructionUserService } from './construction-user.service'

describe('ConstructionUserService', () => {
  let service: ConstructionUserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstructionUserService],
    }).compile()

    service = module.get<ConstructionUserService>(ConstructionUserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
