import { Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import React from 'react'
import { fullName } from '../../utils/user'

type _Construction = {
  id: number
  name: string
  code: string
  users: { familyName: string; givenName: string }[]
}

export type ConstructionsTableProps = {
  readonly constructions: readonly _Construction[]
}

const _ConstructionsTable: React.VFC<ConstructionsTableProps> = ({
  constructions,
}: ConstructionsTableProps) => {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>工事名</Th>
          <Th>工事コード</Th>
          {/* <Th>表示名</Th> */}
          <Th>権限</Th>
        </Tr>
      </Thead>
      <Tbody>
        {constructions.map((construction) => (
          <Tr key={construction.id}>
            <Td>{construction.name}</Td>
            <Td>{construction.code}</Td>
            <Td>{construction.users.map(fullName)}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>工事名</Th>
          <Th>工事コード</Th>
          {/* <Th>表示名</Th> */}
          <Th>権限</Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}

const ConstructionsTable = React.memo(_ConstructionsTable)

export default ConstructionsTable
