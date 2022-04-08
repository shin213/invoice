import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useCreateUnconfirmedUserMutation } from '../../../generated/graphql'
import NewUserModal from './NewUserModal'

export type UnconfirmedUserData = {
  email: string
  familyName: string
  givenName: string
  familyNameFurigana: string
  givenNameFurigana: string
  isAdmin: boolean
  employeeCode: string
}

export type UsersManagementTableProps = {
  readonly unconfirmedUsers: readonly UnconfirmedUserData[]
  readonly createUnconfirmedUser: ReturnType<typeof useCreateUnconfirmedUserMutation>[0]
}

const UsersManagementTable: React.VFC<UsersManagementTableProps> = ({
  unconfirmedUsers,
  createUnconfirmedUser,
}: UsersManagementTableProps) => {
  const [editingId, setEditingId] = useState<string | undefined>(undefined)
  const onClose = () => setEditingId(undefined)

  return (
    <>
      <IconButton
        onClick={() => setEditingId('')}
        variant="outline"
        aria-label="open menu"
        icon={<AiOutlinePlus />}
      />
      <Table variant="simple">
        {/* 強引に再描画している。直したい */}
        {editingId != undefined && (
          <NewUserModal
            isOpen={editingId != undefined}
            onClose={onClose}
            createUnconfirmedUser={createUnconfirmedUser}
          />
        )}
        <Thead>
          <Tr>
            <Th>Eメール</Th>
            <Th>氏</Th>
            <Th>名</Th>
            <Th>従業員コード</Th>
          </Tr>
        </Thead>
        <Tbody>
          {unconfirmedUsers.map((user) => (
            <Tr key={user.email}>
              <Td>{user.email}</Td>
              <Td>{user.familyName || '未登録'}</Td>
              <Td>{user.givenName || '未登録'}</Td>
              <Td>{user.employeeCode || '未登録'}</Td>
              {/* <Td>
                <IconButton
                  onClick={() => setEditingId(user.id)}
                  variant="outline"
                  aria-label="open menu"
                  icon={<MdEdit />}
                />
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default UsersManagementTable
