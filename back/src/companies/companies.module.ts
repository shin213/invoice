import { Module } from '@nestjs/common'
import { CompaniesResolver } from './companies.resolver'
import { CompaniesService } from './companies.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './company'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { UsersModule } from 'src/users/users.module'
import { CognitoService } from 'src/aws/cognito/cognito.service'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Company]), UsersModule, CognitoModule],
  providers: [
    CompaniesResolver,
    CompaniesService,
    CognitoService,
    UsersService,
  ],
  exports: [CompaniesModule, TypeOrmModule],
})
export class CompaniesModule {}
