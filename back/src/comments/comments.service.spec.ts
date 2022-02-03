import { Test, TestingModule } from '@nestjs/testing'
import { baseTestImports } from 'src/utils/tests'
import { CommentsModule } from './comments.module'
import { CommentsService } from './comments.service'

describe('CommentsService', () => {
  let service: CommentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...baseTestImports(), CommentsModule],
    }).compile()

    service = module.get<CommentsService>(CommentsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
