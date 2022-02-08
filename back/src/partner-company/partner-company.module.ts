import { Module } from '@nestjs/common'
import { PartnerCompanyService } from './partner-company.service'
import { PartnerCompanyResolver } from './partner-company.resolver'

@Module({
  providers: [PartnerCompanyService, PartnerCompanyResolver],
})
export class PartnerCompanyModule {}
