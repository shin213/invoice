import { Box, Table, Thead, Tr, Th, Tbody, Td, Button, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdSend } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginTemplate from '../../../components/templates/LoginTemplate'

export type NewInvoiceViewPageElement = {
  order: number
  label: string
  value?: string | null
}

const NewInvoiceViewPage: React.VFC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [args, _] = useState<{ elements: NewInvoiceViewPageElement[] }>(
    location.state as { elements: NewInvoiceViewPageElement[] },
  )

  // TODO: 作り込み
  return (
    <LoginTemplate>
      <div>請求書を良い感じにレンダリングするページ</div>
      <Box bg="white" p={4}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>項目</Th>
              <Th>値</Th>
            </Tr>
          </Thead>
          <Tbody>
            {args.elements.map((element) => (
              <Tr key={element.order}>
                <Td>{element.label}</Td>
                <Td>{element.value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box bg="white" p={2} />
        <Wrap spacing="30px" align="center" justify="right">
          <WrapItem>
            <Button bgColor="cyan.500" color="white" onClick={() => navigate('../issue')}>
              <MdSend title="送信" />
              <Box p="2">送信</Box>
            </Button>
          </WrapItem>
        </Wrap>
      </Box>
    </LoginTemplate>
  )
}

export default NewInvoiceViewPage
