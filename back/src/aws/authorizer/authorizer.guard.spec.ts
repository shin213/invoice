import { AuthorizerGuard } from './authorizer.guard'

describe('AuthorizerGuard', () => {
  it('should be defined', () => {
    expect(new AuthorizerGuard()).toBeDefined()
  })
})
