import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as AWS from 'aws-sdk'
import {
  GetUserResponse,
  UserType,
} from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { UsersService } from 'src/users/users.service'
import { AuthUser, isAdmin } from './cognito'

@Injectable()
export class CognitoService {
  private readonly client: AWS.CognitoIdentityServiceProvider
  private readonly poolData: {
    readonly UserPoolId: string
    readonly ClientId: string
  }
  constructor(private usersService: UsersService) {
    // const credentials = new AWS.SharedIniFileCredentials({
    //   profile: 'default',
    //   filename: 'src/.aws/credentials',
    // })
    // AWS.config.credentials = credentials

    const configService = new ConfigService()

    const awsConfig = {
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID', ''),
      accessSecretKey: configService.get('AWS_SECRET_ACCESS_KEY', ''),
      region: 'ap-northeast-1',
    }
    AWS.config.update(awsConfig)

    this.client = new AWS.CognitoIdentityServiceProvider({
      region: 'ap-northeast-1',
    })
    this.poolData = {
      UserPoolId: configService.get('AWS_USER_POOL_ID', ''),
      ClientId: configService.get('AWS_CLIENT_ID', ''),
    }
  }

  async getUserByTokenAdmin(
    token: string,
  ): Promise<GetUserResponse | undefined> {
    const cognitoUser = await this.client
      .getUser({
        AccessToken: token,
      })
      .promise()
    console.error(cognitoUser)
    if (!isAdmin(cognitoUser)) {
      return undefined
    }
    return cognitoUser
  }
  async getUserByToken(token: string): Promise<AuthUser | undefined> {
    const cognitoUser = await this.client
      .getUser({
        AccessToken: token,
      })
      .promise()

    // TODO: usersService の dependency を解決する(例えば、usersService を分割する)
    const dbUser = await this.usersService.findOneByEmail(cognitoUser.Username)
    if (dbUser == undefined) {
      return undefined
    }

    // const inAdminGroup = Buffer.from(token, 'base64')
    //   .toString('utf8')
    //   .includes('"cognito:groups":["Admin"]')

    return { cognitoUser, dbUser }
  }

  async getCognitoUserByEmail(email: string): Promise<UserType | undefined> {
    const cognitoUser = await new Promise<UserType | undefined>((resolve) => {
      this.client.listUsers(
        {
          UserPoolId: this.poolData.UserPoolId,
          Limit: 1,
          Filter: `email = "${email}"`,
        },
        (err, result) => {
          if (err) {
            console.log(err)
            resolve(undefined)
            return
          }
          if (result.Users == undefined || result.Users.length === 0) {
            resolve(undefined)
            return
          }
          resolve(result.Users[0])
        },
      )
    })
    return cognitoUser
  }
}
