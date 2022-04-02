import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { Request } from 'express'
import { checkProperty } from '../../utils'
import { CognitoService } from '../cognito/cognito.service'

@Injectable()
export class AdminAuthorizerGuard implements CanActivate {
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

  async authorizeByCognito(
    authorizationToken?: string,
  ): Promise<GetUserResponse> {
    if (!authorizationToken) {
      throw new UnauthorizedException('Authorization header is required.')
    }
    try {
      const user = await this.cognito.getUserByTokenAdmin(authorizationToken)
      if (user == undefined) {
        throw new UnauthorizedException(
          'Token is invalid or not of admin user.',
        )
      }
      return user
    } catch (e) {
      console.error(e)
      if (checkProperty(e, 'name') === 'NotAuthorizedException') {
        throw new UnauthorizedException()
      }
      throw e
    }
  }
}
