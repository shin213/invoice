import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { HttpStatus, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmConfigService } from './type_orm_config.service'
import { UsersModule } from './users/users.module'
import { CompaniesModule } from './companies/companies.module'
import { InvoiceFormatsModule } from './invoice-formats/invoice-formats.module'
import { InvoicesModule } from './invoices/invoices.module'
import { CommentsModule } from './comments/comments.module'
import { RequestsModule } from './requests/requests.module'
import { RequestReceiverModule } from './request-receiver/request-receiver.module'
import { RequestNotificationsModule } from './request-notifications/request-notifications.module'
import { JudgementsModule } from './judgements/judgements.module'
import { InvoiceFormatLogsModule } from './invoice-format-logs/invoice-format-logs.module'
import { InvoiceFormatElementsModule } from './invoice-format-elements/invoice-format-elements.module'
import { PartnerCompaniesModule } from './partner-companies/partner-companies.module'
import { ConstructionsModule } from './constructions/constructions.module'
import { InvoiceLogElementsModule } from './invoice-log-elements/invoice-log-elements.module'
import { GraphQLError } from 'graphql'
import { CognitoModule } from './aws/cognito/cognito.module'
import { InvoiceFormatDetailElementsModule } from './invoice-format-detail-elements/invoice-format-detail-elements.module'
import { InvoiceLogDetailElementsModule } from './invoice-log-detail-elements/invoice-log-detail-elements.module'
import { UnconfirmedUsersModule } from './unconfirmed-users/unconfirmed-users.module'
import { InvoicesTransferModule } from './invoices-transfer/invoices-transfer.module'
import { InvoicesResolveModule } from './invoices-resolve/invoices-resolve.module'
import { GraphQLUpload } from 'graphql-upload'
import { InvoiceFilesModule } from './invoice-files/invoice-files.module'
import { checkProperty } from './utils'
import { S3Module } from './aws/s3/s3.module'
import { ConstructionUserModule } from './construction-user/construction-user.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        host: process.env.NEST_HOST,
        credentials: true,
      },
      driver: ApolloDriver,
      resolvers: { Upload: GraphQLUpload },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        console.log(JSON.stringify(error))
        const code =
          checkProperty(error.extensions.exception, 'status') ||
          checkProperty(error.extensions.response, 'statusCode') ||
          HttpStatus.INTERNAL_SERVER_ERROR
        const formatted = new GraphQLError(error.message, {
          ...error,
          extensions: {
            code,
            name:
              (checkProperty(error.extensions.exception, 'name') as
                | string
                | undefined) || error.name,
          },
        })
        return formatted
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    CognitoModule,
    S3Module,
    UnconfirmedUsersModule,
    UsersModule,
    CompaniesModule,
    InvoiceFormatsModule,
    InvoicesModule,
    CommentsModule,
    RequestsModule,
    RequestReceiverModule,
    RequestNotificationsModule,
    JudgementsModule,
    InvoiceFormatLogsModule,
    InvoiceFormatElementsModule,
    PartnerCompaniesModule,
    ConstructionsModule,
    InvoiceLogElementsModule,
    InvoiceFormatDetailElementsModule,
    InvoiceLogDetailElementsModule,
    InvoicesTransferModule,
    InvoicesResolveModule,
    InvoiceFilesModule,
    ConstructionUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
