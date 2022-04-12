import { Module } from '@nestjs/common'
import { InvoiceFilesService } from './invoice-files.service'
import { InvoiceFilesResolver } from './invoice-files.resolver'
import { CognitoModule } from 'src/aws/cognito/cognito.module'
import { S3Module } from 'src/aws/s3/s3.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFile } from './invoice-file'

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceFile]), CognitoModule, S3Module],
  providers: [InvoiceFilesService, InvoiceFilesResolver],
  exports: [InvoiceFilesModule, InvoiceFilesService, TypeOrmModule],
})
export class InvoiceFilesModule {}
