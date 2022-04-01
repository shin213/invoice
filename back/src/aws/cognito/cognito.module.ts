import { forwardRef, Module } from '@nestjs/common'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'
import { UsersModule } from 'src/users/users.module'
import { CognitoService } from './cognito.service'

@Module({
  imports: [
    forwardRef(() => UnconfirmedUsersModule),
    forwardRef(() => UsersModule),
  ],
  providers: [CognitoService],
  exports: [CognitoModule, CognitoService],
})
export class CognitoModule {}
