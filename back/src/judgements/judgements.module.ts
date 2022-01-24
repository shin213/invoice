import { Module } from '@nestjs/common'
import { JudgementsService } from './judgements.service'
import { JudgementsResolver } from './judgements.resolver'

@Module({
  providers: [JudgementsService, JudgementsResolver],
})
export class JudgementsModule {}
