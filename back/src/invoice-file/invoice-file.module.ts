import { Module } from '@nestjs/common'
import { InvoiceFileService } from './invoice-file.service'
import { InvoiceFileResolver } from './invoice-file.resolver'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [CognitoModule],
  providers: [InvoiceFileService, InvoiceFileResolver],
})
export class InvoiceFileModule {}
