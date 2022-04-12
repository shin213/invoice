import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'
import { ReadStream } from 'fs'
import { FileUpload } from 'graphql-upload'
import { randomString } from 'src/utils'

@Injectable()
export class S3Service {
  private s3: S3
  private bucketName: string
  constructor() {
    const configService = new ConfigService()

    const awsConfig = {
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID', ''),
      accessSecretKey: configService.get('AWS_SECRET_ACCESS_KEY', ''),
    }
    this.bucketName = 'invoice-uploaded-data-dev'
    this.s3 = new S3({
      ...awsConfig,
    })
  }

  async upload(
    file: FileUpload,
    directory: string,
    generalConId: number,
  ): Promise<string | undefined> {
    const { filename } = file
    const readStream = file.createReadStream()
    console.log(readStream)
    const ext = filename.split('.').pop() ?? ''
    const now = Date.now()
    const randomStr = randomString(8)
    const name = `${generalConId}/${directory}/${now}_${randomStr}.${ext}`
    try {
      await this._uploadS3(readStream, this.bucketName, name)
    } catch (e) {
      console.error(e)
      return undefined
    }
    readStream.destroy()
    return name
  }

  private _uploadS3(
    fileBuffer: ReadStream,
    bucket: string,
    name: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const params: S3.PutObjectRequest = {
      Bucket: bucket,
      Key: String(name),
      Body: fileBuffer,
    }
    return new Promise<S3.ManagedUpload.SendData>((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve(data)
      })
    })
  }
}
