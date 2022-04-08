import { Module } from '@nestjs/common'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { InvoicesTransferModule } from 'src/invoices-transfer/invoices-transfer.module'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { InvoicesResolveResolver } from './invoices-resolve.resolver'
import { InvoicesResolveService } from './invoices-resolve.service'

@Module({
  imports: [CognitoModule, InvoicesModule, InvoicesTransferModule],
  providers: [InvoicesResolveResolver, InvoicesResolveService],
  exports: [InvoicesResolveModule, InvoicesResolveService],
})
export class InvoicesResolveModule {}
