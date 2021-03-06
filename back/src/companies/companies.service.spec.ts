import { Test, TestingModule } from '@nestjs/testing'
import { testImports } from 'src/utils/tests'
import { CompaniesModule } from './companies.module'
import { CompaniesService } from './companies.service'

describe('CompaniesService', () => {
  let service: CompaniesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), CompaniesModule],
    }).compile()

    service = module.get<CompaniesService>(CompaniesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
