import { Link } from '@chakra-ui/react'
import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import LogoutTemplate from '../../templates/LogoutTemplate'

const NotFoundPage: React.VFC = () => (
  <LogoutTemplate>
    <h1>404 Not Found</h1>
    <Link as={ReactRouterLink} to="/">
      トップへ戻る
    </Link>
  </LogoutTemplate>
)
export default NotFoundPage
