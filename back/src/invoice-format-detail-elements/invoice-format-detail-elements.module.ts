import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFormatDetailElement } from './invoice-format-detail-element'
import { InvoiceFormatDetailElementsService } from './invoice-format-detail-elements.service'
import { InvoiceFormatDetailElementsResolver } from './invoice-format-detail-elements.resolver'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceFormatDetailElement]),
    CognitoModule,
  ],
  providers: [
    InvoiceFormatDetailElementsService,
    InvoiceFormatDetailElementsResolver,
  ],
  exports: [
    InvoiceFormatDetailElementsModule,
    InvoiceFormatDetailElementsService,
    TypeOrmModule,
  ],
})
export class InvoiceFormatDetailElementsModule {}
