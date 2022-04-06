import { HttpStatus, HttpServer } from '@nestjs/common'
import { GraphQLError } from 'graphql'
import * as request from 'supertest'

export const gql = '/graphql'

export const sendQuery = (server: HttpServer, query: string) =>
  request(server).post(gql).send({ query }).expect(HttpStatus.OK)

export const sendQuerySuccess = (
  server: HttpServer,
  query: string,
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
