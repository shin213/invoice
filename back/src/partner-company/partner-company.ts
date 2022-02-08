/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prefecture } from 'src/common/prefecture'
import { Company } from 'src/companies/company'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'partner_companies' })
@ObjectType()
export class PartnerCompany {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  readonly id: number

  @Column({ length: '256', nullable: false })
  @Field()
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

  @Column({ length: '256', nullable: true })
  @Field()
  code: string

  @Column({ nullable: false })
  @Field()
  readonly general_contractor_id: number

  @ManyToOne((type) => Company, (company) => company.partner_companies, {
    nullable: false,
  })
  @JoinColumn({ name: 'general_contractor_id' })
  @Field((type) => Company, { nullable: false })
  readonly general_contractor: Company
}
