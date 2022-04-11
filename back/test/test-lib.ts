import { HttpStatus, HttpServer } from '@nestjs/common'
import { GraphQLError } from 'graphql'
import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from './../src/app.module'

export const gql = '/graphql'

export const sendQuery = (server: HttpServer, query: string) =>
  request(server).post(gql).send({ query }).expect(HttpStatus.OK)

export const sendQuerySuccess = (
  server: HttpServer,
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expectation: (data: any) => void,
) =>
  sendQuery(server, query).expect((res) => {
    console.log(JSON.stringify(res.body))
    expectation(res.body.data)
  })

export const sendQueryFailure = (
  server: HttpServer,
  query: string,
  expectation: (errors: GraphQLError[]) => void,
) =>
  sendQuery(server, query).expect((res) => {
    console.log(JSON.stringify(res.body))
    expectation(res.body.errors)
  })

export const compileTestingModule = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()
  return moduleFixture.createNestApplication()
}
