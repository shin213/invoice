import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { ConstructionsModule } from './constructions.module'
import { ConstructionsService } from './constructions.service'

describe('ConstructionService', () => {
  let service: ConstructionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), ConstructionsModule],
    }).compile()

    service = module.get<ConstructionsService>(ConstructionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
