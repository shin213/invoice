import { Module } from '@nestjs/common'
import { PartnerCompaniesService } from './partner-companies.service'
import { PartnerCompaniesResolver } from './partner-companies.resolver'

@Module({
  providers: [PartnerCompaniesService, PartnerCompaniesResolver],
})
export class PartnerCompaniesModule {}
