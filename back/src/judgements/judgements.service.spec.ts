import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { JudgementsModule } from './judgements.module'
import { JudgementsService } from './judgements.service'

describe('JudgementsService', () => {
  let service: JudgementsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), JudgementsModule],
    }).compile()

    service = module.get<JudgementsService>(JudgementsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
