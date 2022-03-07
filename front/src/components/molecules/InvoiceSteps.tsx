import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React from 'react'

export type InvoiceStepsProps = {
  constructionName: string,
  receiptName: string,
  approvalName1: string,
  approvalName2: string,
  status: string
}

const statusToInitialStep = (status: string) => {
  // TODO: 場合分けを完全にする
  if (status == 'not_requested') {
    return 0
  } else if (status == 'requested') {
    return 1
  } else {
    return 2
  }
}

const InvoiceSteps: React.VFC<InvoiceStepsProps> = (prop: InvoiceStepsProps) => {
  const initialStep = statusToInitialStep(prop.status)
  const { activeStep } = useSteps({ initialStep })

  return (
    <Steps colorScheme="cyan" activeStep={activeStep}>
      <Step label={prop.receiptName} key={prop.receiptName} description={`${prop.constructionName} 受領`} />
      <Step label={prop.approvalName1} key={prop.approvalName1} description={`${prop.constructionName} 承認1`} />
      <Step label={prop.approvalName2} key={prop.approvalName2} description={`${prop.constructionName} 承認2`} />
    </Steps>
  )
}

export default InvoiceSteps
