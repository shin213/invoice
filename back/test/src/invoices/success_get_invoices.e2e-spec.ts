import { INestApplication } from '@nestjs/common'
import { compileTestingModule } from './../../test-lib'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getInvoicesQuery = `
  query {
    invoices {
      id
    }
  }
`

describe('Invoices Test', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await compileTestingModule()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Get invoices', async () => {
    // test case（略）
  })
})
