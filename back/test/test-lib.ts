import { HttpStatus } from '@nestjs/common'
import * as request from 'supertest'

export const gql = '/graphql'

export const sendQuery = (server: any, query: string) =>
  request(server).post(gql).send({ query }).expect(HttpStatus.OK)
