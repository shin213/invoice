import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthorizerGuard } from './aws/authorizer/authorizer.guard'
import { CognitoService } from './aws/cognito/cognito.service'

@Controller()
@UseGuards(AuthorizerGuard)
export class AppController {
  constructor(private readonly cognito: CognitoService) {}

  @Get()
  getHello(): string {
    return `Hello World!`
  }
}
