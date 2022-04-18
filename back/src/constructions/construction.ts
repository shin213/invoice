/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
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
  UpdateDateColumn,
} from 'typeorm'

export enum ShownName {
  name = 'name',
  code = 'code',
  custom = 'custom',
}

registerEnumType(ShownName, { name: 'ShownName' })

@Entity({ name: 'constructions' })
@ObjectType()
export class Construction {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  readonly id!: number

  @Column('varchar', { nullable: false })
  @Field((type) => String)
  name!: string

  @Column('varchar', { length: '256', nullable: false, default: '' })
  @Field((type) => String, { nullable: false })
  code!: string

  @Column({
    type: 'enum',
    enum: ShownName,
    comment:
      '協力企業に工事名を表示するか工事コード、カスタム表示名を表示するか',
    default: ShownName.name,
  })
  @Field((type) => ShownName, {
    description:
      '協力企業に工事名を表示するか工事コード、カスタム表示名を表示するか',
  })
  shownName!: ShownName

  @Column('varchar', {
    length: '256',
    default: '',
    comment: 'カスタム表示名',
  })
  @Field((type) => String, { description: 'カスタム表示名' })
  customShownName!: string

  @Column('text', { default: '', comment: '備考' })
  @Field((type) => String, { description: '備考' })
  remarks!: string

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  updatedAt!: Date

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
