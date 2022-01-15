/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { InvoiceFormat } from 'src/invoice-formats/invoice-format'
import { User } from 'src/users/user'
import { Invoice } from 'src/invoices/invoice'

@Entity({ name: 'companies' })
@ObjectType()
export class Company {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @Column({ length: '50' })
  @Field()
  name: string

  @OneToMany((type) => InvoiceFormat, (format) => format.company)
  invoice_formats: InvoiceFormat[]

  @OneToMany((type) => User, (user) => user.company)
  users: User[]

  @OneToMany((type) => Invoice, (invoice) => invoice.company)
  invoices: Invoice[]
}
