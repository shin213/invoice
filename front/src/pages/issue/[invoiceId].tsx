import { Box, Button, useToast, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useCallback, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  InvoiceLogElementInput,
  IssueIdQuery,
  useIssueIdQuery,
  useIssueIdUpdateInvoiceMutation,
  useIssueIdUploadInvoiceFileMutation,
} from '../../generated/graphql'
import LoginTemplate from '../../components/templates/LoginTemplate'
import NewInvoiceEditor, { EditorElement } from '../../components/molecules/NewInvoiceEditor'
import { MdSave, MdCheckCircle } from 'react-icons/md'
import { mutationOptionsWithMsg } from '../../utils'
import { useDropzone } from 'react-dropzone'
import { PrimaryButton } from '../../components/atoms/Buttons'

function toEditorElements(data: IssueIdQuery): EditorElement[] {
  const { body, invoiceFormatLog } = data.invoice
  const vals = Object.fromEntries(body.map((element) => [element.elementId, element.value]))
  const editorElements: EditorElement[] = invoiceFormatLog.elements.map((element) => ({
    id: element.id,
    order: element.order,
    label: element.label,
    value: vals[element.id],
    valueType: element.valueType,
    own: element.own,
  }))
  return editorElements
}

type _NewInvoiceDetailPageProps = {
  data: IssueIdQuery
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const activeStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const _NewInvoiceDetailPage: React.VFC<_NewInvoiceDetailPageProps> = ({
  data,
}: _NewInvoiceDetailPageProps) => {
  const navigate = useNavigate()
  const toast = useToast()

  const elements = toEditorElements(data)
  const [body, setBody] = useState<EditorElement[]>(elements)

  const [updateInvoiceLog] = useIssueIdUpdateInvoiceMutation(
    mutationOptionsWithMsg(toast, '更新しました。'),
  )

  const [uploadFile] = useIssueIdUploadInvoiceFileMutation(
    mutationOptionsWithMsg(toast, 'ファイルをアップロードしました。'),
  )

  const onClickSave = useCallback(async () => {
    const inputBody: InvoiceLogElementInput[] = body
      .filter((elm) => elm.value != null)
      .map((elm) => ({
        elementId: elm.id,
        value: elm.value || '',
      }))
    const result = await updateInvoiceLog({
      variables: {
        input: {
          id: data.invoice.id,
          body: inputBody,
        },
      },
    })
    console.log(result, body)
  }, [body, data.invoice.id, updateInvoiceLog])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      maxSize: 1024 * 1024 * 10, // 10MB
    })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  )

  const handleUploadFile = useCallback(async () => {
    const file = acceptedFiles[0]
    if (file == undefined) {
      return
    }
    uploadFile({ variables: { file } })
  }, [uploadFile, acceptedFiles])
  const files = acceptedFiles.map((file) => <li key={file.name}>{file.name}</li>)

  return (
    <Box bg="white" p={4}>
      <NewInvoiceEditor body={body} setBody={setBody} />
      <Box bg="white" p={2} />
      <Wrap spacing="30px" align="center" justify="right">
        <WrapItem>
          <Button bgColor="cyan.500" color="white" onClick={() => onClickSave()}>
            <MdSave title="保存" />
            <Box p="2">保存</Box>
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            bgColor="teal.400"
            color="white"
            onClick={() => navigate('view', { state: { body } })}
          >
            <MdCheckCircle title="確認" />
            <Box p="2">確認</Box>
          </Button>
        </WrapItem>
      </Wrap>
      <div
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...getRootProps({ style: style as any })
        }
      >
        <input type="file" {...getInputProps()} />
        <div>ファイルをドラッグ＆ドロップ</div>
        <div>またはここをクリックしてファイルを選択</div>
      </div>
      <ul>{files}</ul>
      <PrimaryButton onClick={() => handleUploadFile()}>アップロード</PrimaryButton>
    </Box>
  )
}

const NewInvoiceDetailPage: React.VFC = () => {
  const { invoiceId } = useParams()
  const { error, data } = useIssueIdQuery({
    variables: { id: invoiceId || '' },
    fetchPolicy: 'no-cache',
  })
  if (error) {
    console.error(error)
  }

  return (
    <LoginTemplate currentUser={data?.currentUser}>
      {data && <_NewInvoiceDetailPage data={data} />}
    </LoginTemplate>
  )
}

export default NewInvoiceDetailPage
