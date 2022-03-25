import { MigrationInterface, QueryRunner } from 'typeorm'

export class combineInvoiceLog1648205594207 implements MigrationInterface {
  name = 'combineInvoiceLog1648205594207'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "payment_amount"`,
    )
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "billing_date"`)
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "due_date_for_payment"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "invoice_format_log_id" uuid NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "invoices" ADD "body" jsonb NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "detail" jsonb NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_329ae0de7fcf9a2549b9ce61e13" FOREIGN KEY ("invoice_format_log_id") REFERENCES "invoice_formats_log"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_329ae0de7fcf9a2549b9ce61e13"`,
    )
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "detail"`)
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "body"`)
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "invoice_format_log_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "due_date_for_payment" TIMESTAMP WITH TIME ZONE`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "billing_date" TIMESTAMP WITH TIME ZONE`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "payment_amount" integer`,
    )
  }
}
