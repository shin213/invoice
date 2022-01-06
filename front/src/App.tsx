import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import ApprovalsPage from './components/pages/Approvals'
import HomePage from './components/pages/Home'
import NotFoundPage from './components/pages/logout/ NotFoundPage'
import RegistrationsPage from './components/pages/Registrations'
import RequestsPage from './components/pages/Requests'
import SettingsPage from './components/pages/Settings'

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registrations" element={<RegistrationsPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/approvals" element={<ApprovalsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
