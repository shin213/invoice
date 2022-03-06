import { Auth, Hub } from 'aws-amplify'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type AuthUser = unknown

const AuthUserContext = createContext<AuthUser | undefined>(undefined)

type AuthUserProviderProps = {
  readonly children: ReactNode
}

const AuthUserProvider: React.VFC<AuthUserProviderProps> = ({
  children,
}: AuthUserProviderProps) => {
  const [user, setUser] = useState<AuthUser | undefined>(undefined)
  useEffect(() => {
    const updateUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch {
        setUser(undefined)
      }
    }
    Hub.listen('auth', updateUser) // listen for login/signup events
    updateUser() // check manually the first time because we won't get a Hub event
    return () => Hub.remove('auth', updateUser) // cleanup
  }, [])

  return <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
}

export const useUser = (): AuthUser | undefined => useContext(AuthUserContext)

export default AuthUserProvider
