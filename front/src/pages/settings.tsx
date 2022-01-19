import React from 'react'
import UserListCard from '../components/molecules/UserListCard'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useSettingsQuery } from '../generated/graphql'

const RequestsPage: React.VFC = () => {
  const { loading, error, data } = useSettingsQuery()
  if (loading || error || !data) {
    if (error) {
      console.error(error)
    }
    return (
      <LoginTemplate>
        <div>ユーザー権限管理</div>
      </LoginTemplate>
    )
  }
  return (
    <LoginTemplate>
      <div>ユーザー権限管理</div>
      {data.users.map((user) => (
        <UserListCard key={user.id} name={user.name} email={user.email} />
      ))}
    </LoginTemplate>
  )
}

export default RequestsPage
