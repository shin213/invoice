import { Module } from '@nestjs/common'
import { ConstructionsService } from './constructions.service'
import { ConstructionsResolver } from './constructions.resolver'
import { Construction } from './construction'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Construction])],
  providers: [ConstructionsService, ConstructionsResolver],
  exports: [ConstructionsModule, TypeOrmModule],
})
export class ConstructionsModule {}
