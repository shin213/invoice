import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID || '',
  ClientId: process.env.REACT_APP_AWS_CLIENT_ID || '',
}

export const userPool = new CognitoUserPool(poolData)

export const useUser = () => userPool.getCurrentUser()
