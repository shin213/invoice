import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/logout/NotFoundPage'
import { SignInPage } from './pages/signin'
import { SignUpPage } from './pages/signup'
import AuthUserProvider, { useUser } from './Auth'
import CompaniesPage from './pages/companies'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import UnconfirmedUsersPage from './pages/unconfirmed_users'

const PrivateRoutes: React.VFC = () => {
  const user = useUser()

  if (user == undefined) {
    return <Navigate to="/signin" />
  } else {
    return (
      <Routes>
        <Route path="" element={<SignUpPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="unconfirmed_users" element={<UnconfirmedUsersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    )
  }
}

const SignIn = () => {
  const user = useUser()

  if (user != undefined) {
    return <Navigate to="/" />
  } else {
    return <SignInPage />
  }
}

export default function App(): JSX.Element {
  return (
    <AuthUserProvider>
      <_App />
    </AuthUserProvider>
  )
}

function _App(): JSX.Element {
  const user = useUser()

  const authToken = user?.getSignInUserSession()?.getAccessToken().getJwtToken()

  console.log(authToken)

  const headers: Record<string, string> = authToken == undefined ? {} : { authorization: authToken }

  const client = new ApolloClient({
    uri: `${process.env.REACT_APP_BACKEND_HOST}/graphql`,
    cache: new InMemoryCache(),
    headers,
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}
