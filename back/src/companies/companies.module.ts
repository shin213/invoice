import { Module } from '@nestjs/common'
import { CompaniesResolver } from './companies.resolver'
import { CompaniesService } from './companies.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './company'

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesResolver, CompaniesService],
})
export class CompaniesModule {}
