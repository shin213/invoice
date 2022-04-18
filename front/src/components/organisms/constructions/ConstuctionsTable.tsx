import { Table, Thead, Tr, Th, Tbody, Td, Tfoot, IconButton } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { ShownName, useCreateConstructionMutation } from '../../../generated/graphql'
import { shownName } from '../../../utils/construction'
import { fullName } from '../../../utils/user'
import NewConstructionModal from './NewConstructionModal'

type _Construction = {
  id: number
  name: string
  code: string
  shownName: ShownName
  customShownName: string
  users: { familyName: string; givenName: string }[]
}

export type ConstructionsTableProps = {
  readonly constructions: readonly _Construction[]
  readonly createConstruction: ReturnType<typeof useCreateConstructionMutation>[0]
  readonly users: readonly {
    id: string
    familyName: string
    givenName: string
    familyNameFurigana: string
    givenNameFurigana: string
  }[]
}

const _ConstructionsTable: React.VFC<ConstructionsTableProps> = ({
  constructions,
  users,
  createConstruction,
}: ConstructionsTableProps) => {
  const [editingId, setEditingId] = useState<string | undefined>(undefined)
  const onClose = useCallback(() => setEditingId(undefined), [])
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
          <NewConstructionModal
            isOpen={editingId != undefined}
            onClose={onClose}
            createConstruction={createConstruction}
            users={users}
          />
        )}
        <Thead>
          <Tr>
            <Th>工事名</Th>
            <Th>工事コード</Th>
            <Th>表示名</Th>
            <Th>権限</Th>
          </Tr>
        </Thead>
        <Tbody>
          {constructions.map((construction) => (
            <Tr key={construction.id}>
              <Td>{construction.name}</Td>
              <Td>{construction.code}</Td>
              <Td>{shownName(construction)}</Td>
              <Td>{construction.users.map(fullName)[0]}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>工事名</Th>
            <Th>工事コード</Th>
            <Th>表示名</Th>
            <Th>権限</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  )
}

const ConstructionsTable = React.memo(_ConstructionsTable)

export default ConstructionsTable
