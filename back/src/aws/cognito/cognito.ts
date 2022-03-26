import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { User } from 'src/users/user'

export type AuthUser = {
  readonly cognitoUser: GetUserResponse
  readonly dbUser: User
}

export function isAdmin(cognitoUser: GetUserResponse): boolean {
  return cognitoUser.Username.startsWith('Google_')
}
