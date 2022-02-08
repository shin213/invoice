import { Module } from '@nestjs/common'
import { ConstructionsService } from './constructions.service'
import { ConstructionsResolver } from './constructions.resolver'

@Module({
  providers: [ConstructionsService, ConstructionsResolver],
})
export class ConstructionsModule {}
