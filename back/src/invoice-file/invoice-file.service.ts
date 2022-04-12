import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FileUpload } from 'graphql-upload'
import { S3Service } from 'src/aws/s3/s3.service'
import { Repository } from 'typeorm'
import { InvoiceFile } from './invoice-file'

@Injectable()
export class InvoiceFileService {
  constructor(
    @InjectRepository(InvoiceFile)
    private invoiceFileRepository: Repository<InvoiceFile>,
    private s3Service: S3Service,
  ) {}

  async uploadFile(
    generalConId: number,
    invoiceId: string,
    file: FileUpload,
  ): Promise<InvoiceFile> {
    const pathName = await this.s3Service.upload(
      file,
      'invoice_file',
      generalConId,
    )
    const invoiceFile = await this.invoiceFileRepository.create({
      pathName,
      invoiceId,
    })
    await this.invoiceFileRepository.save(invoiceFile)
    return invoiceFile
  }
}
