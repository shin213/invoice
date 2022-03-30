import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user'
import { UnconfirmedUsersService } from 'src/unconfirmed-users/unconfirmed-users.service'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), UnconfirmedUsersModule],
  providers: [UsersService, UsersResolver, UnconfirmedUsersService],
  exports: [UsersModule, TypeOrmModule],
})
export class UsersModule {}
