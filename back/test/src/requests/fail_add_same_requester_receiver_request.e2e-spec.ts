import { INestApplication } from '@nestjs/common'
import { compileTestingModule } from './../../test-lib'

const addSameRequesterReceiverQuery = `
  mutation {
    addRequest(newRequest: {
      requesterId: "d2e1e2e5-42d5-440d-b34b-95b8e2e7485d",
      invoiceId: "0e5cdeb1-a4e3-4407-b33e-88cf5dbec2ea",
      requestReceiverIds: ["d2e1e2e5-42d5-440d-b34b-95b8e2e7485d", "842a556d-defc-470a-b87a-4f1f1578565e"],
      comment: "承認をお願いします。\\n今日中ですと助かります。"
    }) {
	  id
      requesterId
      invoiceId
      companyId
    }
  }
`

describe('Requests Test', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await compileTestingModule()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Add request', async () => {
    // test case
    // 1. add前のrequestの数を取得
    // 2. addのqueryを実行
    // 3. add後の数を取得し比較
    // 4. addされた要素を簡単にテスト
    // TODO: 上記のテストケースを実装
  })
})
