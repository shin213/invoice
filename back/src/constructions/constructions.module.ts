import { Module } from '@nestjs/common'
import { ConstructionsService } from './constructions.service'
import { ConstructionsResolver } from './constructions.resolver'
import { Construction } from './construction'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { ConstructionUserModule } from 'src/construction-user/construction-user.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Construction]),
    CognitoModule,
    UsersModule,
    ConstructionUserModule,
  ],
  providers: [ConstructionsService, ConstructionsResolver],
  exports: [ConstructionsModule, ConstructionsService, TypeOrmModule],
})
export class ConstructionsModule {}
