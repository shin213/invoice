import { Module } from '@nestjs/common'
import { InvoicesTransferService } from './invoices-transfer.service'
import { InvoicesTransferResolver } from './invoices-transfer.resolver'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { RequestsModule } from 'src/requests/requests.module'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [CognitoModule, InvoicesModule, RequestsModule],
  providers: [InvoicesTransferService, InvoicesTransferResolver],
  exports: [InvoicesTransferModule, InvoicesTransferService],
})
export class InvoicesTransferModule {}
