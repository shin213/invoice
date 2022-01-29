import { Module } from '@nestjs/common'
import { JudgementsService } from './judgements.service'
import { JudgementsResolver } from './judgements.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Judgement } from './judgement'

@Module({
  imports: [TypeOrmModule.forFeature([Judgement])],
  providers: [JudgementsService, JudgementsResolver],
  exports: [JudgementsModule, TypeOrmModule],
})
export class JudgementsModule {}
