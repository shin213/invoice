import { INestApplication } from '@nestjs/common'
import { compileTestingModule } from './../../test-lib'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addApprovingJudgementQuery = `
  mutation {
    addJudgement(newJudgement: {
      userId: "d2e1e2e5-42d5-440d-b34b-95b8e2e7485d",
      comment: "問題ないので承認します",
      requestId: 1,
      type: "approve"
    }) {
      id
      userId
      type
      requestId
    }
  }
`

describe('Judgements Test', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await compileTestingModule()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Add approving judgement', async () => {
    // test case
    // 1. add前のjudgementの数を取得
    // 2. addのqueryを実行
    // 3. add後の数を取得し比較
    // 4. addされた要素を簡単にテスト
    // TODO: 上記のテストケースを実装
    // 現在は query judgements が消えているので、それの実装がいる？
  })
})
