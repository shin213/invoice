import React from 'react'
import ReactDOM from 'react-dom'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig } from 'chakra-ui-steps'
import App from './App'
import AuthUserProvider from './lib/cognito'
import { Auth } from 'aws-amplify'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Asia/Tokyo')

Auth.configure({
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
  primary: {
    DEFAULT: '#005490',
    500: '#005490',
  },
}
const theme = extendTheme({
  colors,
  components: {
    Steps: StepsStyleConfig,
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthUserProvider>
        <App />
      </AuthUserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
