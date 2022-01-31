import { Module } from '@nestjs/common'
import { RequestsService } from './requests.service'
import { RequestsResolver } from './requests.resolver'
import { Request } from './request'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [RequestsService, RequestsResolver],
  exports: [RequestsModule, TypeOrmModule],
})
export class RequestsModule {}
