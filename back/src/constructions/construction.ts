/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Company } from 'src/companies/company'
import { ConstructionUser } from 'src/construction-user/construction-user'
import { Invoice } from 'src/invoices/invoice'
import { User } from 'src/users/user'
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
  readonly id!: number

  @Column('varchar', { length: '256', nullable: false, default: '' })
  @Field((type) => String, { nullable: false })
  code!: string

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  createdAt!: Date

  @Column('varchar', { nullable: false })
  @Field((type) => String)
  name!: string

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly companyId!: number

  @ManyToOne((type) => Company, (company) => company.constructions)
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company, { nullable: false })
  readonly company!: Company

  @OneToMany((type) => Invoice, (invoice) => invoice.construction)
  invoices!: Promise<Invoice[]>

  @OneToMany(
    (type) => ConstructionUser,
    (constructionUser) => constructionUser.construction,
  )
  constructionUsers!: ConstructionUser[]

  @Field((type) => [User])
  users!: User[]
}
