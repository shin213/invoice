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
import { InvoiceLogsModule } from './invoice-logs/invoice-logs.module'
import { InvoiceLogElementsModule } from './invoice-log-elements/invoice-log-elements.module'
import { GraphQLError } from 'graphql'
import { CognitoService } from './aws/cognito/cognito.service'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        console.error(JSON.stringify(error))
        const code =
          error.extensions?.exception?.status ||
          error.extensions?.response?.statusCode
        HttpStatus.INTERNAL_SERVER_ERROR
        const formatted: GraphQLError = {
          ...error,
          message: error.message,
          name: error.extensions?.exception?.name || error.name,
          extensions: { code },
        }
        return formatted
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
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
    InvoiceLogsModule,
    InvoiceLogElementsModule,
  ],
  controllers: [AppController],
  providers: [CognitoService, AppService],
})
export class AppModule {}
