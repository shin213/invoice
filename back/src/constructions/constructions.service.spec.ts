import { Test, TestingModule } from '@nestjs/testing'
import { ConstructionsService } from './constructions.service'

describe('ConstructionService', () => {
  let service: ConstructionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstructionsService],
    }).compile()

    service = module.get<ConstructionsService>(ConstructionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
