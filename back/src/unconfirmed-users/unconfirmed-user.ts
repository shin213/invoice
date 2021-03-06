/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Company } from 'src/companies/company'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'

@Entity({ name: 'unconfirmed_users' })
@ObjectType()
export class UnconfirmedUser {
  @PrimaryColumn()
  @Field((type) => ID)
  email!: string

  @Column({ length: '256', nullable: false, default: '' })
  @Field({ nullable: false })
  familyName!: string

  @Column({ length: '256', nullable: false, default: '' })
  @Field({ nullable: false })
  givenName!: string

  @Column({ length: '256', nullable: false, default: '' })
  @Field({ nullable: false })
  familyNameFurigana!: string

  @Column({ length: '256', nullable: false, default: '' })
  @Field({ nullable: false })
  givenNameFurigana!: string

  @Column({ nullable: false })
  @Field({ nullable: false })
  isAdmin!: boolean

  @Column('varchar', { nullable: false, default: '' })
  @Field()
  employeeCode!: string

  @Column({ nullable: false })
  @Field((type) => Int)
  companyId!: number

  @ManyToOne((type) => Company, (company) => company.users, {
    nullable: false,
  })
  @Field((type) => Company, { nullable: false })
  company!: Company

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  readonly createdAt!: Date
}
