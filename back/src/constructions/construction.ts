/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Company } from 'src/companies/company'
import { Invoice } from 'src/invoices/invoice'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'constructions' })
@ObjectType()
export class Construction {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  readonly id: number

  @Field({ nullable: true })
  code: string | null

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  created_at: Date

  @Field()
  name: string

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly company_id: number

  @ManyToOne((type) => Company, (company) => company.constructions)
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company, { nullable: false })
  readonly company: Company

  @OneToMany((type) => Invoice, (invoice) => invoice.construction)
  invoices: Promise<Invoice[]>
}
