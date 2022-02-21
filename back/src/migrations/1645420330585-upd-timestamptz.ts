import { MigrationInterface, QueryRunner } from 'typeorm'

export class updTimestamptz1645420330585 implements MigrationInterface {
  name = 'updTimestamptz1645420330585'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "billing_date"`)
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "billing_date" TIMESTAMP WITH TIME ZONE`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "due_date_for_payment"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "due_date_for_payment" TIMESTAMP WITH TIME ZONE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "due_date_for_payment"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "due_date_for_payment" TIMESTAMP`,
    )
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "billing_date"`)
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "billing_date" TIMESTAMP`,
    )
  }
}
