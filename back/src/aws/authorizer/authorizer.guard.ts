import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'
import { checkProperty } from '../../utils'
import { AuthUser } from '../cognito/cognito'
import { CognitoService } from '../cognito/cognito.service'

@Injectable()
export class AuthorizerGuard implements CanActivate {
  constructor(private readonly cognito: CognitoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()
    // const req = context.switchToHttp().getRequest()
    const { authorization } = (req as Request).headers
    const user = await this.authorizeByCognito(authorization)
    // ライブラリ・passport 方式でmutableに変更する（もっといいやり方があれば知りたい）
    req['user'] = user
    return true
  }

  public async authorizeByCognito(
    authorizationToken?: string,
  ): Promise<AuthUser> {
    if (!authorizationToken) {
      throw new UnauthorizedException(`Authorization header is required.`)
    }
    try {
      const user = await this.cognito.getUserByToken(authorizationToken)
      if (user == undefined) {
        throw new UnauthorizedException()
      }
      return user
    } catch (e) {
      if (checkProperty(e, 'name') === 'NotAuthorizedException') {
        throw new UnauthorizedException()
      }
      throw e
    }
  }
}
