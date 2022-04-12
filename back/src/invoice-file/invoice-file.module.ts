import { Module } from '@nestjs/common'
import { InvoiceFileService } from './invoice-file.service'
import { InvoiceFileResolver } from './invoice-file.resolver'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { S3Module } from 'src/aws/s3/s3.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFile } from './invoice-file'

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceFile]), CognitoModule, S3Module],
  providers: [InvoiceFileService, InvoiceFileResolver],
  exports: [InvoiceFileModule, InvoiceFileService, TypeOrmModule],
})
export class InvoiceFileModule {}
