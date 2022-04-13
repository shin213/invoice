import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FileUpload } from 'graphql-upload'
import { S3Service } from 'src/aws/s3/s3.service'
import { User } from 'src/users/user'
import { Repository } from 'typeorm'
import { InvoiceFile } from './invoice-file'

@Injectable()
export class InvoiceFilesService {
  constructor(
    @InjectRepository(InvoiceFile)
    private invoiceFileRepository: Repository<InvoiceFile>,
    private s3Service: S3Service,
  ) {}

  async uploadFile(
    user: User,
    invoiceId: string,
    file: FileUpload,
  ): Promise<InvoiceFile> {
    const pathName = await this.s3Service.upload(
      file,
      `invoice_file/${invoiceId}`,
      user.companyId,
    )
    const invoiceFile = await this.invoiceFileRepository.create({
      pathName,
      invoiceId,
      createdById: user.id,
    })
    await this.invoiceFileRepository.save(invoiceFile)
    return invoiceFile
  }
}
