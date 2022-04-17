import { Module } from '@nestjs/common'
import { ConstructionUserService } from './construction-user.service'
import { ConstructionUserResolver } from './construction-user.resolver'

@Module({
  providers: [ConstructionUserService, ConstructionUserResolver],
})
export class ConstructionUserModule {}
