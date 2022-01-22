import { Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import React from 'react'

export type UsersTableProps = {
  users: {
    __typename?: unknown
    id: string
    name: string
    email: string
    is_admin: boolean
  }[]
}

const UsersTable: React.VFC<UsersTableProps> = ({ users }: UsersTableProps) => (
  <Table variant="striped">
    {' '}
    {/*colorScheme="cyan"*/}
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
          <Td>{user.name}</Td>
          <Td>{user.email}</Td>
          <Td>{user.is_admin ? '管理者' : '閲覧者'}</Td>
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
