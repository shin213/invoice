import { Table, Thead, Tr, Th, Tbody, Td, Tfoot, Checkbox } from '@chakra-ui/react'
import React, { useState } from 'react'

export type UsersTableProps = {
  users: {
    __typename?: unknown
    id: number
    family_name: string
    given_name: string
    family_name_furigana: string
    given_name_furigana: string
    email: string
    is_admin: boolean
    employee_code?: string | null
  }[]
}

const UsersTable: React.VFC<UsersTableProps> = ({ users }: UsersTableProps) => {
  const [checkedUsers, setCheckedUsers] = useState<number[]>([])
  const onChangeCheckBox = async (user_id: number, is_checked: boolean) => {
    if (is_checked){
      setCheckedUsers([...checkedUsers, user_id])
    } else {
      const k = checkedUsers.indexOf(user_id, 0)
      setCheckedUsers([...checkedUsers.slice(0, k), ...checkedUsers.slice(k+1, )])
    }
  }

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>申請先</Th>
          <Th>氏名</Th>
          <Th>メールアドレス</Th>
          <Th>権限</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td><Checkbox backgroundColor='white' onChange={(e) => onChangeCheckBox(user.id, e.target.checked)}></Checkbox></Td>
            <Td>{`${user.family_name} ${user.given_name}`}</Td>
            <Td>{user.email}</Td>
            <Td>{user.is_admin ? '管理者' : '閲覧者'}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>申請先</Th>
          <Th>氏名</Th>
          <Th>メールアドレス</Th>
          <Th>権限</Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}

export default UsersTable
