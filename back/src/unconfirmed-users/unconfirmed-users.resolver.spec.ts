import { Test, TestingModule } from '@nestjs/testing'
import { UnconfirmedUsersResolver } from './unconfirmed-users.resolver'

describe('UnconfirmedUsersResolver', () => {
  let resolver: UnconfirmedUsersResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnconfirmedUsersResolver],
    }).compile()

    resolver = module.get<UnconfirmedUsersResolver>(UnconfirmedUsersResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
