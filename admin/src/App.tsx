import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/logout/NotFoundPage'
import { SignInPage } from './pages/signin'
import { SignUpPage } from './pages/signup'
import AuthUserProvider, { useUser } from './Auth'
import CompaniesPage from './pages/companies'

const PrivateRoutes: React.VFC = () => {
  const user = useUser()
  console.log(user)

  if (user == null) {
    return <Navigate to="/signin" />
  } else {
    return (
      <Routes>
        <Route path="" element={<SignUpPage />} />
        <Route path="companies" element={<CompaniesPage />} />
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
    <AuthUserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthUserProvider>
  )
}
