import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CognitoModule,
    UnconfirmedUsersModule,
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersModule, UsersService, TypeOrmModule],
})
export class UsersModule {}
