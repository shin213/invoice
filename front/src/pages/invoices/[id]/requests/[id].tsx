import React from 'react'
import LoginTemplate from '../../../../components/templates/LoginTemplate'
import { useGetRequestQuery } from '../../../../generated/graphql'

const RequestDetailPage: React.VFC = () => {
  const hoge = 42

  return (
    <LoginTemplate>
      <h1>Request Detail Page: {hoge}</h1>
    </LoginTemplate>
  )
}

export default RequestDetailPage
