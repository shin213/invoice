import { Table, Thead, Tr, Th, Tbody, Td, Tfoot, Checkbox } from '@chakra-ui/react'
import React, { memo, useCallback } from 'react'

export type CheckableUsersTableProps = {
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
  checkedUsers: Set<number>
  setCheckedUsers: React.Dispatch<React.SetStateAction<Set<number>>>
}

const _CheckableUsersTable: React.VFC<CheckableUsersTableProps> = ({
  users,
  checkedUsers,
  setCheckedUsers,
}: CheckableUsersTableProps) => {
  const onChangeCheckBox = useCallback(
    async (user_id: number, is_checked: boolean) => {
      const _checkedUsers = new Set(checkedUsers)
      if (is_checked) {
        _checkedUsers.add(user_id)
      } else {
        _checkedUsers.delete(user_id)
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
            <Td>{`${user.family_name} ${user.given_name}`}</Td>
            <Td>{user.email}</Td>
            <Td>{user.is_admin ? '管理者' : '閲覧者'}</Td>
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