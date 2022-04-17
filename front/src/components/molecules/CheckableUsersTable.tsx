import { Table, Thead, Tr, Th, Tbody, Td, Tfoot, Checkbox } from '@chakra-ui/react'
import React, { memo, useCallback } from 'react'
import { adminJp, fullName } from '../../utils/user'

export type CheckableUsersTableProps = {
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
  checkedUsers: Set<string>
  setCheckedUsers: React.Dispatch<React.SetStateAction<Set<string>>>
}

const _CheckableUsersTable: React.VFC<CheckableUsersTableProps> = ({
  users,
  checkedUsers,
  setCheckedUsers,
}: CheckableUsersTableProps) => {
  const onChangeCheckBox = useCallback(
    async (userId: string, isChecked: boolean) => {
      const _checkedUsers = new Set(checkedUsers)
      if (isChecked) {
        _checkedUsers.add(userId)
      } else {
        _checkedUsers.delete(userId)
      }
      setCheckedUsers(_checkedUsers)
    },
    [checkedUsers],
  )

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>送信先</Th>
          <Th>氏名</Th>
          <Th>メールアドレス</Th>
          <Th>権限</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>
              <Checkbox
                backgroundColor="white"
                onChange={(e) => onChangeCheckBox(user.id, e.target.checked)}
              ></Checkbox>
            </Td>
            <Td>{fullName(user)}</Td>
            <Td>{user.email}</Td>
            <Td>{adminJp(user)}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>送信先</Th>
          <Th>氏名</Th>
          <Th>メールアドレス</Th>
          <Th>権限</Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}
const CheckableUsersTable = memo(_CheckableUsersTable)

export default CheckableUsersTable
