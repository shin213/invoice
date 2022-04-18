import { Module } from '@nestjs/common'
import { ConstructionUserService } from './construction-user.service'
import { ConstructionUserResolver } from './construction-user.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConstructionUser } from './construction-user'

@Module({
  imports: [TypeOrmModule.forFeature([ConstructionUser])],
  providers: [ConstructionUserService, ConstructionUserResolver],
  exports: [ConstructionUserModule, ConstructionUserService, TypeOrmModule],
})
export class ConstructionUserModule {}
