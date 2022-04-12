import { Injectable } from '@nestjs/common'
import { FileUpload } from 'graphql-upload'
import { S3Service } from 'src/aws/s3/s3.service'

@Injectable()
export class InvoiceFileService {
  constructor(private s3Service: S3Service) {}

  async uploadFile(generalConId: number, file: FileUpload) {
    const name = await this.s3Service.upload(file, 'invoice_file', generalConId)
    console.log(name)
  }
}
