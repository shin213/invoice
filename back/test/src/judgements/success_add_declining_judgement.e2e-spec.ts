import { INestApplication } from '@nestjs/common'
import { compileTestingModule } from './../../test-lib'

const addDecliningJudgementQuery = `
  mutation {
    addJudgement(newJudgement: {
      userId: d64b0537-ebff-430d-aa43-200df562cab9,
      comment: "ここはどういうことですか",
      requestId: 3,
      type: "decline"
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

  it('Add declining judgement', async () => {
    // test case
    // 1. add前のjudgementの数を取得
    // 2. addのqueryを実行
    // 3. add後の数を取得し比較
    // 4. addされた要素を簡単にテスト
    // TODO: 上記のテストケースを実装
    // 現在は query judgements が消えているので、それの実装がいる？
  })
})
