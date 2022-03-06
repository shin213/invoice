import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { CognitoService } from './cognito.service'

@Module({
  imports: [UsersModule],
  providers: [UsersService, CognitoService],
  exports: [CognitoModule],
})
export class CognitoModule {}
