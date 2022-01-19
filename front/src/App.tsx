import React from 'react'
import { BrowserRouter, Navigate, Route, RouteProps, Routes } from 'react-router-dom'
import ApprovalsPage from './pages/approvals'
import HomePage from './pages'
import NotFoundPage from './pages/logout/ NotFoundPage'
import RegistrationsPage from './pages/registrations'
import RequestsPage from './pages/requests'
import SettingsPage from './pages/settings'
import { useUser } from './libs/cognito'

const PrivateRoutes: React.VFC = () => {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/login" />
  } else {
    return (
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="registrations" element={<RegistrationsPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    )
  }
}

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<HomePage />} />
        <Route path="/*" element={<PrivateRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
