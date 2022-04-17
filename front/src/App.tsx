import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { withScalars } from 'apollo-link-scalars'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/logout/NotFoundPage'
import ApprovalsPage from './pages/approvals'
import SettingsPage from './pages/settings'
import SignInPage from './pages/signin'
import SignUpPage from './pages/signup'
import InvoiceDetailPage from './pages/invoices/[invoiceId]'
import RequestSendPage from './pages/invoices/[invoiceId]/request'
import InquirySendPage from './pages/invoices/[invoiceId]/inquiry'
import InvoiceFormatsPage from './pages/formats'
import IssueListPage from './pages/issue'
import NewInvoiceDetailPage from './pages/issue/[invoiceId]'
import NewInvoiceViewPage from './pages/issue/[invoiceId]/view'
import StorePage from './pages/store'
import ReceiptsPage from './pages/receipts'
import UsersPage from './pages/users'
import introspectionResult from './generated/graphql.schema.json'
import { Auth } from 'aws-amplify'
import { buildClientSchema, IntrospectionQuery } from 'graphql'
import dayjs from 'dayjs'

const authLink = setContext(async (_, { headers }) => {
  const token = await (await Auth.currentSession()).getAccessToken().getJwtToken()
  return {
    headers: {
      ...headers,
      authorization: token ?? '',
    },
  }
})

const schema = buildClientSchema(introspectionResult as unknown as IntrospectionQuery)

const typesMap = {
  DateTime: {
    serialize: (parsed: unknown): string | undefined => {
      if (parsed instanceof dayjs.Dayjs) {
        return parsed.toISOString()
      }
      throw new Error(`typeof DateTime given is not instance of Dayjs but ${typeof parsed}`)
    },
    parseValue: (raw: unknown): dayjs.Dayjs => {
      if (typeof raw !== 'string') {
        throw new Error(`DateTime given from backend must be a string but got ${typeof raw}`)
      }
      const parsed = dayjs(raw)
      if (!parsed.isValid()) {
        throw new Error(`DateTime given from backend is not valid: ${raw}`)
      }
      return parsed
    },
  },
}

const uri = `${process.env.REACT_APP_BACKEND_HOST}/graphql`

const scalarsLink = ApolloLink.from([withScalars({ schema, typesMap }), createUploadLink({ uri })])

const client = new ApolloClient({
  link: authLink.concat(scalarsLink),
  cache: new InMemoryCache(),
})

export default function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
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
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}
