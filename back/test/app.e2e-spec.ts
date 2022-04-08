import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
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
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
