import React from 'react'
import SocialProfileWithImage from '../components/molecules/UserCard1'
import SocialProfileWithImageHorizontal from '../components/molecules/UserCard2'
import LoginTemplate from '../components/templates/LoginTemplate'

const RequestsPage: React.VFC = () => (
  <LoginTemplate>
    <div>This is Requests.</div>
    <SocialProfileWithImage />
    <SocialProfileWithImageHorizontal />
  </LoginTemplate>
)

export default RequestsPage
