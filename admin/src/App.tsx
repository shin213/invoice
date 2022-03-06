import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/logout/NotFoundPage'
import RegistrationsPage from './pages/registrations'
import ApprovalsPage from './pages/approvals'
import SettingsPage from './pages/settings'
import { useUser } from './lib/cognito'
import { SignInPage } from './pages/signin'
import { SignUpPage } from './pages/signup'
import InvoiceDetailPage from './pages/invoices/[id]'
import RequestSendPage from './pages/invoices/[id]/request'
import InquirySendPage from './pages/invoices/[id]/inquiry'
import ApprovalSendPage from './pages/invoices/[id]/approval'
import InvoiceFormatsPage from './pages/formats'
import IssueListPage from './pages/issue/issue'
import NewInvoiceDetailPage from './pages/issue/[id]'
import NewInvoiceViewPage from './pages/issue/[id]/view'
import StorePage from './pages/store'
import ReqestDetailPage from './pages/invoices/[id]/requests/[id]'

const PrivateRoutes: React.VFC = () => {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/signin" />
  } else {
    return (
      <Routes>
        <Route path="" element={<Navigate to="/approvals" />} />
        <Route path="registrations" element={<RegistrationsPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="invoices/:id" element={<InvoiceDetailPage />} />
        <Route path="invoices/:id/request" element={<RequestSendPage />} />
        <Route path="invoices/:inv_id/requests/:req_id" element={<ReqestDetailPage />} />
        <Route path="invoices/:id/inquiry" element={<InquirySendPage />} />
        <Route path="invoices/:id/approval" element={<ApprovalSendPage />} />
        <Route path="formats" element={<InvoiceFormatsPage />} />
        <Route path="issue" element={<IssueListPage />} />
        <Route path="issue/:id" element={<NewInvoiceDetailPage />} />
        <Route path="issue/:id/view" element={<NewInvoiceViewPage />} />
        <Route path="store" element={<StorePage />} />
        <Route path="settings" element={<SettingsPage />} />
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/*" element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
