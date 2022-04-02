import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID || '',
  ClientId: process.env.REACT_APP_AWS_CLIENT_ID || '',
}

export const userPool = new CognitoUserPool(poolData)

// const adminPoolData = {
//   UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID || '',
//   ClientId: process.env.REACT_APP_AWS_CLIENT_ID || '',
// }

// export const adminUserPool = new CognitoUserPool(adminPoolData)

// export const useUser = () => Auth
