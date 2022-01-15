import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { CognitoService } from '../cognito/cognito.service'

@Injectable()
export class AuthorizerGuard implements CanActivate {
  constructor(private readonly cognito: CognitoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const { authorization } = request.headers
    await this.authorizeByCognito(authorization)
    return true
  }

  public async authorizeByCognito(authorizationToken?: string): Promise<void> {
    if (!authorizationToken)
      throw new UnauthorizedException(`Authorization header is required.`)
    try {
      await this.cognito.getUserByToken(authorizationToken)
    } catch (e) {
      if (e.name === 'NotAuthorizedException') throw new UnauthorizedException()
      throw e
    }
  }
}
