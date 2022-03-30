import { forwardRef, Module } from '@nestjs/common'
import { UnconfirmedUsersService } from './unconfirmed-users.service'
import { UnconfirmedUsersResolver } from './unconfirmed-users.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UnconfirmedUser } from './unconfirmed-user'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { CognitoService } from 'src/aws/cognito/cognito.service'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UnconfirmedUser]),
    CognitoModule,
    forwardRef(() => UsersModule),
  ],
  providers: [
    CognitoService,
    UsersService,
    UnconfirmedUsersService,
    UnconfirmedUsersResolver,
  ],
  exports: [UnconfirmedUsersModule, TypeOrmModule],
})
export class UnconfirmedUsersModule {}
