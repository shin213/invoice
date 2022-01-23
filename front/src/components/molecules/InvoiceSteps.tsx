import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React from 'react'

const steps = [
  { label: '織田信長', description: 'ツバキビル新築工事受領' },
  { label: '豊臣秀吉', description: 'ツバキビル新築工事\n現場監督\n承認1' },
  { label: 'あなた', description: '承認2' },
]

const InvoiceSteps: React.VFC = () => {
  const { activeStep } = useSteps({
    initialStep: 2,
  })

  return (
    <Steps colorScheme="cyan" activeStep={activeStep}>
      {steps.map(({ label, description }) => (
        <Step label={label} key={label} description={description} />
      ))}
    </Steps>
  )
}

export default InvoiceSteps
