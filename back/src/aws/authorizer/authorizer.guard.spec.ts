import { CognitoService } from '../cognito/cognito.service'
import { AuthorizerGuard } from './authorizer.guard'

describe('AuthorizerGuard', () => {
  it('should be defined', () => {
    expect(new AuthorizerGuard(new CognitoService())).toBeDefined()
  })
})
