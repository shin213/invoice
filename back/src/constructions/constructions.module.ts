import { Module } from '@nestjs/common'
import { ConstructionsService } from './constructions.service'
import { ConstructionsResolver } from './constructions.resolver'
import { Construction } from './construction'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [TypeOrmModule.forFeature([Construction]), CognitoModule],
  providers: [ConstructionsService, ConstructionsResolver],
  exports: [ConstructionsModule, ConstructionsService, TypeOrmModule],
})
export class ConstructionsModule {}
