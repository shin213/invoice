import { Module } from '@nestjs/common'
import { CompaniesResolver } from './companies.resolver'
import { CompaniesService } from './companies.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './company'
import { CognitoService } from 'src/aws/cognito/cognito.service'

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CognitoService, CompaniesResolver, CompaniesService],
  exports: [CompaniesModule, TypeOrmModule],
})
export class CompaniesModule {}
