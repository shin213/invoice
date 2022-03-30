import { Module } from '@nestjs/common'
import { CompaniesResolver } from './companies.resolver'
import { CompaniesService } from './companies.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './company'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { UsersModule } from 'src/users/users.module'
import { CognitoService } from 'src/aws/cognito/cognito.service'
import { UsersService } from 'src/users/users.service'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'
import { UnconfirmedUsersService } from 'src/unconfirmed-users/unconfirmed-users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    UnconfirmedUsersModule,
    UsersModule,
    CognitoModule,
  ],
  providers: [
    CompaniesResolver,
    CompaniesService,
    UnconfirmedUsersService,
    CognitoService,
    UsersService,
  ],
  exports: [CompaniesModule, TypeOrmModule],
})
export class CompaniesModule {}
