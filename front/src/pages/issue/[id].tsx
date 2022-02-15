import { Box, Button, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { InvoiceLogQuery, useInvoiceLogQuery } from '../../generated/graphql'
import LoginTemplate from '../../components/templates/LoginTemplate'
import NewInvoiceEditor, {
  NewInvoiceEditorProps,
} from '../../components/molecules/NewInvoiceEditor'
import { MdSave, MdCheckCircle } from 'react-icons/md'

function toNewInvoiceEditorProps(data: InvoiceLogQuery): NewInvoiceEditorProps {
  const { body, invoice_format_log } = data.getInvoiceLog
  const vals = Object.fromEntries(body.map((element) => [element.label, element.value]))
  const props: NewInvoiceEditorProps = {
    elements: invoice_format_log.body.map((element) => ({
      order: element.order,
      label: element.label,
      value: vals[element.label],
    })),
  }
  return props
}

const NewInvoiceDetailPage: React.VFC = () => {
  const navigate = useNavigate()
  const [isEditor, setIsEditor] = useState(true)
  const firstEffect = useRef(true)

  useEffect(() => {
    // 初回はInvoiceLogが取得できないので無視
    if (firstEffect.current) {
      firstEffect.current = false
      return
    }
    // 存在しなければトップへ
    if (!isEditor) {
      navigate('../issue', { replace: true })
    }
  }, [isEditor])

  const nullPage = <LoginTemplate>{null}</LoginTemplate>

  const { id } = useParams()
  if (!id) {
    if (isEditor) {
      setIsEditor(false)
    }
    return nullPage
  }

  const { error, data } = useInvoiceLogQuery({ variables: { id } })
  if (error && isEditor) {
    setIsEditor(false)
  }
  if (!data) {
    return nullPage
  }

  const { elements } = toNewInvoiceEditorProps(data)

  return (
    <LoginTemplate>
      <Box bg="white" p={4}>
        <NewInvoiceEditor elements={elements} />
        <Box bg="white" p={2} />
        <Wrap spacing="30px" align="center" justify="right">
          <WrapItem>
            <Button bgColor="cyan.500" color="white" onClick={() => navigate('../issue')}>
              <MdSave title="保存" />
              <Box p="2">保存</Box>
            </Button>
          </WrapItem>
          <WrapItem>
            <Button
              bgColor="teal.400"
              color="white"
              onClick={() => navigate('view', { state: { elements } })}
            >
              <MdCheckCircle title="確認" />
              <Box p="2">確認</Box>
            </Button>
          </WrapItem>
        </Wrap>
      </Box>
    </LoginTemplate>
  )
}

export default NewInvoiceDetailPage
