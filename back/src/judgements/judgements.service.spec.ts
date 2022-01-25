import { Test, TestingModule } from '@nestjs/testing'
import { JudgementsService } from './judgements.service'

describe('JudgementsService', () => {
  let service: JudgementsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JudgementsService],
    }).compile()

    service = module.get<JudgementsService>(JudgementsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
