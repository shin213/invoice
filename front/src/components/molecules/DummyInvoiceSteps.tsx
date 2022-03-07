import React from 'react'
import InvoiceSteps, { InvoiceStepsProps } from './InvoiceSteps'


const dummyStep: InvoiceStepsProps = {
  constructionName: 'ツバキビル新築工事',
  receiptName: '織田信長',
  approvalName1: '豊臣秀吉',
  approvalName2: 'あなた',
  status: 'not_requested'
}


const DummyInvoiceSteps: React.VFC = () => (
  InvoiceSteps(dummyStep)
)

export default DummyInvoiceSteps
