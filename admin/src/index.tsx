import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig } from 'chakra-ui-steps'
import App from './App'
import { Auth } from 'aws-amplify'

const oauth = {
  domain: 'dev-admin-invoice-akari.auth.ap-northeast-1.amazoncognito.com',
  scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
  redirectSignIn: 'http://localhost:3080/signin/',
  redirectSignOut: 'http://localhost:3080/signin/',
  responseType: 'token',
}

Auth.configure({
  oauth,
  // identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
  region: 'ap-northeast-1',
  userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_AWS_CLIENT_ID,
})

// Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}
const theme = extendTheme({
  colors,
  components: {
    Steps: StepsStyleConfig,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
