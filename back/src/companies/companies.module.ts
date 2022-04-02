import { Module } from '@nestjs/common'
import { CompaniesResolver } from './companies.resolver'
import { CompaniesService } from './companies.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './company'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { UsersModule } from 'src/users/users.module'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    UnconfirmedUsersModule,
    UsersModule,
    CognitoModule,
  ],
  providers: [CompaniesResolver, CompaniesService],
  exports: [CompaniesModule, CompaniesService, TypeOrmModule],
})
export class CompaniesModule {}
