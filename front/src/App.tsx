import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ApprovalsPage from './pages/approvals'
import HomePage from './pages'
import NotFoundPage from './pages/logout/NotFoundPage'
import RegistrationsPage from './pages/registrations'
import RequestsPage from './pages/requests'
import SettingsPage from './pages/settings'
import { useUser } from './lib/cognito'
import { SignInPage } from './pages/signin'
import { SignUpPage } from './pages/signup'
import RequestDetail from './pages/requests/[id]'

const PrivateRoutes: React.VFC = () => {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/signin" />
  } else {
    return (
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="registrations" element={<RegistrationsPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="requests/:id" element={<RequestDetail />} />
        <Route path="approvals" element={<ApprovalsPage />} />
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
