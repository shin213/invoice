import React from 'react'
import UserListCard from '../molecules/UserListCard'
import SocialProfileWithImage from '../molecules/UserCard1'
import SocialProfileWithImageHorizontal from '../molecules/UserCard2'
import LoginTemplate from '../templates/LoginTemplate'

const RequestsPage: React.VFC = () => (
  <LoginTemplate>
    <div>This is Requests.</div>
    <UserListCard />
    <SocialProfileWithImage />
    <SocialProfileWithImageHorizontal />
  </LoginTemplate>
)

export default RequestsPage
