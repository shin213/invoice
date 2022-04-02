import { Test, TestingModule } from '@nestjs/testing'
import { UsersModule } from 'src/users/users.module'
import { testImports } from 'src/utils/tests'
import { CognitoService } from '../cognito/cognito.service'
import { AuthorizerGuard } from './authorizer.guard'

describe('AuthorizerGuard', () => {
  let service: CognitoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...testImports(), UsersModule],
      providers: [CognitoService],
    }).compile()

    service = module.get<CognitoService>(CognitoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it('should be defined', () => {
    expect(new AuthorizerGuard(service)).toBeDefined()
  })
})
