import { Module } from '@nestjs/common'
import { PartnerCompanyService } from './partner-companies.service'
import { PartnerCompanyResolver } from './partner-companies.resolver'

@Module({
  providers: [PartnerCompanyService, PartnerCompanyResolver],
})
export class PartnerCompanyModule {}
