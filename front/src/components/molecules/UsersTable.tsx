import { Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import React from 'react'
import { adminJp, fullName } from '../../utils/user'

export type UsersTableProps = {
  users: {
    __typename?: unknown
    id: string
    familyName: string
    givenName: string
    familyNameFurigana: string
    givenNameFurigana: string
    email: string
    isAdmin: boolean
    employeeCode?: string | null
  }[]
}

const UsersTable: React.VFC<UsersTableProps> = ({ users }: UsersTableProps) => (
  <Table variant="striped">
    <Thead>
      <Tr>
        <Th>氏名</Th>
        <Th>メールアドレス</Th>
        <Th>権限</Th>
      </Tr>
    </Thead>
    <Tbody>
      {users.map((user) => (
        <Tr key={user.id}>
          <Td>{fullName(user)}</Td>
          <Td>{user.email}</Td>
          <Td>{adminJp(user)}</Td>
        </Tr>
      ))}
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>氏名</Th>
        <Th>メールアドレス</Th>
        <Th>権限</Th>
      </Tr>
    </Tfoot>
  </Table>
)

export default UsersTable
