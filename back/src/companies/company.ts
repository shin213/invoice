/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm'
import { InvoiceFormat } from 'src/invoice-formats/invoice-format'
import { User } from 'src/users/user'
import { Invoice } from 'src/invoices/invoice'
import { Request } from 'src/requests/request'
import { PartnerCompany } from 'src/partner-companies/partner-company'
import { Prefecture } from 'src/common/prefecture'
import { Construction } from 'src/constructions/construction'

@Entity({ name: 'companies' })
@ObjectType()
export class Company {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  readonly id!: number

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  readonly createdAt!: Date

  @Column({ length: '256', nullable: false, default: '' })
  @Field({ nullable: false })
  name!: string

  @Column({ length: '50', nullable: false, default: '' })
  @Field()
  phoneNumber!: string

  @Column({ length: '50', nullable: false })
  @Field()
  postalCode!: string

  @Column({ type: 'enum', enum: Prefecture, nullable: true })
  @Field((type) => Prefecture, { nullable: true })
  prefecture: Prefecture | null = null

  // 市区町村
  @Column({ length: '256', nullable: false, default: '' })
  @Field((type) => String, { nullable: true })
  city!: string

  // 残りの住所
  @Column('varchar', { nullable: false, default: '' })
  @Field()
  restAddress!: string

  @OneToMany((type) => InvoiceFormat, (format) => format.company)
  invoiceFormats!: Promise<InvoiceFormat[]>

  @OneToMany((type) => User, (user) => user.company)
  users!: Promise<User[]>

  @OneToMany((type) => Invoice, (invoice) => invoice.company)
  invoices!: Promise<Invoice[]>

  @OneToMany((type) => Request, (request) => request.company)
  requests!: Promise<Request[]>

  @OneToMany((type) => Construction, (construction) => construction.company)
  constructions!: Promise<Construction[]>

  // 自分が協力会社となる
  @OneToMany(
    (type) => PartnerCompany,
    (partnerCompany) => partnerCompany.selfCompany,
  )
  asPartners!: Promise<PartnerCompany[]>

  // 自分がゼネコンとして協力会社を持つ
  @OneToMany(
    (type) => PartnerCompany,
    (partnerCompany) => partnerCompany.generalContractor,
  )
  partnerCompanies!: Promise<PartnerCompany[]>
}
