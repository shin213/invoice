import { forwardRef, Module } from '@nestjs/common'
import { UnconfirmedUsersService } from './unconfirmed-users.service'
import { UnconfirmedUsersResolver } from './unconfirmed-users.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UnconfirmedUser } from './unconfirmed-user'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([UnconfirmedUser]),
    CognitoModule,
    forwardRef(() => UsersModule),
  ],
  providers: [UnconfirmedUsersService, UnconfirmedUsersResolver],
  exports: [UnconfirmedUsersModule, UnconfirmedUsersService, TypeOrmModule],
})
export class UnconfirmedUsersModule {}
