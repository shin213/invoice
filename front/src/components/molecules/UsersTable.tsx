import { Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import React from 'react'

export type UsersTableProps = {
  users: {
    __typename?: unknown
    id: number
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
          <Td>{`${user.familyName} ${user.givenName}`}</Td>
          <Td>{user.email}</Td>
          <Td>{user.isAdmin ? '管理者' : '閲覧者'}</Td>
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
