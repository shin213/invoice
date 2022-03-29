/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql'
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
  readonly id!: number

  @Column('varchar', { length: '256', nullable: false, default: '' })
  @Field()
  code!: string

  @Column({ nullable: false })
  @Field()
  readonly selfCompanyId!: number

  @ManyToOne((type) => Company, (company) => company.asPartners, {
    nullable: false,
  })
  selfCompany!: Company

  @Column({ nullable: false })
  @Field()
  readonly generalContractorId!: number

  @ManyToOne((type) => Company, (company) => company.partnerCompanies, {
    nullable: false,
  })
  @JoinColumn({ name: 'general_contractor_id' })
  @Field((type) => Company, { nullable: false })
  readonly generalContractor!: Company
}
