import React from 'react'
import UserListCard from '../components/molecules/UserListCard'
import SocialProfileWithImage from '../components/molecules/UserCard1'
import SocialProfileWithImageHorizontal from '../components/molecules/UserCard2'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useRequestsQuery } from '../generated/graphql'

const RequestsPage: React.VFC = () => {
  const { loading, error, data } = useRequestsQuery({
    variables: {
      company_id: 1,
    },
  })
  if (loading || error) {
    if (error) {
      console.error(error)
    }
    console.log(data)
    return (
      <LoginTemplate>
        <div>This is Requests.</div>
        <UserListCard />
        <SocialProfileWithImage />
        <SocialProfileWithImageHorizontal />
      </LoginTemplate>
    )
  }
  console.log(data)
  return (
    <LoginTemplate>
      <div>This is Requests.</div>
      <UserListCard />
      <SocialProfileWithImage />
      <SocialProfileWithImageHorizontal />
    </LoginTemplate>
  )
}

export default RequestsPage
