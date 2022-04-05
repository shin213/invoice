import { HttpStatus, HttpServer } from '@nestjs/common'
import * as request from 'supertest'

export const gql = '/graphql'

export const sendQuery = (server: HttpServer, query: string) =>
  request(server).post(gql).send({ query }).expect(HttpStatus.OK)
