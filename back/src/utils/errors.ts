import { HttpException, HttpStatus } from '@nestjs/common'

export function companyMismatchError(): HttpException {
  return new HttpException('Company mismatch', HttpStatus.BAD_REQUEST)
}
