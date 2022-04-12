import { Module } from '@nestjs/common'
import { InvoiceFileService } from './invoice-file.service'
import { InvoiceFileResolver } from './invoice-file.resolver'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { S3Module } from 'src/aws/s3/s3.module'

@Module({
  imports: [CognitoModule, S3Module],
  providers: [InvoiceFileService, InvoiceFileResolver],
  exports: [InvoiceFileModule, InvoiceFileService],
})
export class InvoiceFileModule {}
