import { INestApplication } from '@nestjs/common'
import { compileTestingModule } from './test-lib'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await compileTestingModule()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/ (GET)', async () => {
    // TODO: テストでの認証周りの解決
    // await request(app.getHttpServer())
    //   .get('/')
    //   .expect(200)
    //   .expect('Hello World!')
  })
})
