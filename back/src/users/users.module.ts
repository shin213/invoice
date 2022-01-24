import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), CompaniesModule],
  providers: [UsersService, UsersResolver, CompaniesService],
  exports: [UsersModule, TypeOrmModule],
})
export class UsersModule {}
