/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { InvoiceFormat } from '../invoice-formats/invoice-format'

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
  @Field(() => [InvoiceFormat], { nullable: true })
  invoice_formats: InvoiceFormat[]
}
