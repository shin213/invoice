import { Module } from '@nestjs/common'
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
import { InvoiceFormatLogsModule } from './invoice-format-logs/invoice-format-logs.module'
import { InvoiceFormatElementsModule } from './invoice-format-elements/invoice-format-elements.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    CompaniesModule,
    InvoiceFormatsModule,
    InvoiceFormatLogsModule,
    InvoiceFormatElementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
