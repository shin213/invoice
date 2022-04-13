import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'
import NotFoundPage from './pages/logout/NotFoundPage'
import SignInPage from './pages/signin'
import AuthUserProvider from './Auth'
import CompaniesPage from './pages/companies'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import UnconfirmedUsersPage from './pages/unconfirmed_users'
import { Auth } from 'aws-amplify'

export default function App(): JSX.Element {
  return (
    <AuthUserProvider>
      <_App />
    </AuthUserProvider>
  )
}

const authLink = setContext(async (_, { headers }) => {
  const token = await (await Auth.currentSession()).getAccessToken().getJwtToken()
  return {
    headers: {
      ...headers,
      authorization: token ?? '',
    },
  }
})

const uri = `${process.env.REACT_APP_BACKEND_HOST}/graphql`
const client = new ApolloClient({
  link: authLink.concat(createHttpLink({ uri })),
  cache: new InMemoryCache(),
})

function _App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="" element={<Navigate to="unconfirmed_users" />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="unconfirmed_users" element={<UnconfirmedUsersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}
