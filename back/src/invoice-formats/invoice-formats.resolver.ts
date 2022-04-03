/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { NewInvoiceFormatInput } from './dto/newInvoiceFormat.input'
import { InvoiceFormat } from './invoice-format'
import { InvoiceFormatsService } from './invoice-formats.service'
import { Company } from 'src/companies/company'
import { AdminAuthorizerGuard } from 'src/aws/admin-authorizer/admin-authorizer.guard'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthUser } from 'src/aws/cognito/cognito'
import { companyMismatchError } from 'src/utils/errors'

@Resolver((of: unknown) => InvoiceFormat)
export class InvoiceFormatsResolver {
  constructor(private formatsService: InvoiceFormatsService) {}

  @UseGuards(AuthorizerGuard)
  @Query((returns) => [InvoiceFormat])
  invoiceFormats(@CurrentUser() user: AuthUser): Promise<InvoiceFormat[]> {
    return this.formatsService.findAll(user.dbUser.companyId)
  }

  // @UseGuards(AdminAuthorizerGuard)
  // @Query((returns) => InvoiceFormat)
  // async getInvoiceFormat(@Args({ name: 'id', type: () => String }) id: string) {
  //   const format = await this.formatsService.findOneById(id)
  //   if (!format) {
  //     throw new NotFoundException(id)
  //   }
  //   return format
  // }

  @ResolveField('company')
  async company(@Parent() format: InvoiceFormat): Promise<Company | undefined> {
    return await this.formatsService.company(format.companyId)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => InvoiceFormat)
  addInvoiceFormat(
    @CurrentUser() user: AuthUser,
    @Args('newInvoiceFormat') newFormat: NewInvoiceFormatInput,
  ): Promise<InvoiceFormat> {
    if (newFormat.companyId !== user.dbUser.companyId) {
      throw companyMismatchError()
    }
    return this.formatsService.create(newFormat)
  }

  // @UseGuards(AdminAuthorizerGuard)
  // @Mutation((returns) => Boolean)
  // async removeInvoiceFormat(
  //   @Args({ name: 'id', type: () => String }) id: string,
  // ) {
  //   return this.formatsService.remove(id)
  // }
}
