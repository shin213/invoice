import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import { Auth, Hub } from 'aws-amplify'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const poolData = {
  UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID || '',
  ClientId: process.env.REACT_APP_AWS_CLIENT_ID || '',
}

export const userPool = new CognitoUserPool(poolData)

const AuthUserContext = createContext<CognitoUser | undefined>(undefined)

type AuthUserProviderProps = {
  readonly children: ReactNode
}

const AuthUserProvider: React.VFC<AuthUserProviderProps> = ({
  children,
}: AuthUserProviderProps) => {
  const [user, setUser] = useState<CognitoUser | undefined>(undefined)
  useEffect(() => {
    const updateUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch (e) {
        console.error(e)
        setUser(undefined)
      }
    }
    Hub.listen('auth', updateUser) // listen for login/signup events
    updateUser() // check manually the first time because we won't get a Hub event
    return () => Hub.remove('auth', updateUser) // cleanup
  }, [])

  return <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
}

export const useUser = (): CognitoUser | undefined => useContext(AuthUserContext)

export default AuthUserProvider
