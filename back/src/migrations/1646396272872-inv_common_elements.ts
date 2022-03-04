import { MigrationInterface, QueryRunner } from 'typeorm'

export class invCommonElements1646396272872 implements MigrationInterface {
  name = 'invCommonElements1646396272872'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" ADD "construction_name_id" character varying`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "invoice_formats_log"."construction_name_id" IS '[共通項目] 工事名'`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" ADD "billing_date_id" character varying`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "invoice_formats_log"."billing_date_id" IS '[共通項目] 請求日'`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" ADD "payment_deadline_id" character varying`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "invoice_formats_log"."payment_deadline_id" IS '[共通項目] 支払期限'`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" ADD "payment_amount_id" character varying`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "invoice_formats_log"."payment_amount_id" IS '[共通項目] 支払金額'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "invoice_formats_log"."payment_amount_id" IS '[共通項目] 支払金額'`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" DROP COLUMN "payment_amount_id"`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "invoice_formats_log"."payment_deadline_id" IS '[共通項目] 支払期限'`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" DROP COLUMN "payment_deadline_id"`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "invoice_formats_log"."billing_date_id" IS '[共通項目] 請求日'`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" DROP COLUMN "billing_date_id"`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "invoice_formats_log"."construction_name_id" IS '[共通項目] 工事名'`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" DROP COLUMN "construction_name_id"`,
    )
  }
}
