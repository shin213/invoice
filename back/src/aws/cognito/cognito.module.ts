import { forwardRef, Module } from '@nestjs/common'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'
import { UnconfirmedUsersService } from 'src/unconfirmed-users/unconfirmed-users.service'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { CognitoService } from './cognito.service'

@Module({
  imports: [
    forwardRef(() => UnconfirmedUsersModule),
    forwardRef(() => UsersModule),
  ],
  providers: [UnconfirmedUsersService, UsersService, CognitoService],
  exports: [CognitoModule],
})
export class CognitoModule {}
