import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/logout/NotFoundPage'
import ApprovalsPage from './pages/approvals'
import SettingsPage from './pages/settings'
import { useUser } from './lib/cognito'
import { SignInPage } from './pages/signin'
import SignUpPage from './pages/signup'
import InvoiceDetailPage from './pages/invoices/[invoiceId]'
import RequestSendPage from './pages/invoices/[invoiceId]/request'
import InquirySendPage from './pages/invoices/[invoiceId]/inquiry'
import InvoiceFormatsPage from './pages/formats'
import IssueListPage from './pages/issue/issue'
import NewInvoiceDetailPage from './pages/issue/[invoiceId]'
import NewInvoiceViewPage from './pages/issue/[invoiceId]/view'
import StorePage from './pages/store'
import ReceiptsPage from './pages/receipts'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import UsersPage from './pages/users'

const PrivateRoutes: React.VFC = () => {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/signin" />
  } else {
    return (
      <Routes>
        <Route path="" element={<Navigate to="/approvals" />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="invoices/:invoiceId" element={<InvoiceDetailPage />} />
        {/* TODO: remove */}
        <Route path="invoices/:invoiceId/request" element={<RequestSendPage />} />
        <Route path="invoices/:invoiceId/inquiry" element={<InquirySendPage />} />
        {/* TODO: remove end*/}
        <Route path="receipts" element={<ReceiptsPage />} />
        <Route path="formats" element={<InvoiceFormatsPage />} />
        <Route path="issue" element={<IssueListPage />} />
        <Route path="issue/:invoiceId" element={<NewInvoiceDetailPage />} />
        <Route path="issue/:invoiceId/view" element={<NewInvoiceViewPage />} />
        <Route path="store" element={<StorePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    )
  }
}

const SignIn = () => {
  const user = useUser()

  if (user != null) {
    return <Navigate to="/" />
  } else {
    return <SignInPage />
  }
}

export default function App(): JSX.Element {
  const user = useUser()

  const authToken = user?.getSignInUserSession()?.getAccessToken().getJwtToken()
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
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}
