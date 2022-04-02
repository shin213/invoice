import { TestingModule, Test } from '@nestjs/testing'
import { UsersModule } from 'src/users/users.module'
import { testImports } from 'src/utils/tests'
import { CognitoService } from '../cognito/cognito.service'
import { AdminAuthorizerGuard } from './admin-authorizer.guard'

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
    expect(new AdminAuthorizerGuard(service)).toBeDefined()
  })
})
