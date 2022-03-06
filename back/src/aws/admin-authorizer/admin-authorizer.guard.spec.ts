import { CognitoService } from '../cognito/cognito.service'
import { AdminAuthorizerGuard } from './admin-authorizer.guard'

describe('AuthorizerGuard', () => {
  it('should be defined', () => {
    expect(new AdminAuthorizerGuard(new CognitoService())).toBeDefined()
  })
})
