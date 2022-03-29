import { Test, TestingModule } from '@nestjs/testing'
import { UnconfirmedUsersService } from './unconfirmed-users.service'

describe('UnconfirmedUsersService', () => {
  let service: UnconfirmedUsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnconfirmedUsersService],
    }).compile()

    service = module.get<UnconfirmedUsersService>(UnconfirmedUsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
