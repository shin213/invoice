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
  readonly id: number

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  readonly created_at: Date

  @Column({ length: '50', nullable: false })
  @Field({ nullable: false })
  name: string

  @Column({ length: '50', nullable: true })
  @Field()
  phone_number: string | null

  @Column({ length: '50', nullable: true })
  @Field()
  postal_code: string | null

  @Column({ type: 'enum', enum: Prefecture, nullable: true })
  @Field((type) => Prefecture, { nullable: true })
  prefecture: Prefecture | null

  // 市区町村
  @Column({ length: '50', nullable: true })
  @Field()
  city: string | null

  // 残りの住所
  @Column({ length: '256', nullable: true })
  @Field()
  rest_address: string | null

  @OneToMany((type) => InvoiceFormat, (format) => format.company)
  invoice_formats: Promise<InvoiceFormat[]>

  @OneToMany((type) => User, (user) => user.company)
  users: Promise<User[]>

  @OneToMany((type) => Invoice, (invoice) => invoice.company)
  invoices: Promise<Invoice[]>

  @OneToMany((type) => Request, (request) => request.company)
  requests: Promise<Request[]>

  @OneToMany((type) => Construction, (construction) => construction.company)
  constructions: Promise<Construction[]>

  @OneToMany(
    (type) => PartnerCompany,
    (partnerCompany) => partnerCompany.general_contractor,
  )
  partner_companies: Promise<PartnerCompany[]>
}
