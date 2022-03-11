import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceLogDetailElements1646968787532
  implements MigrationInterface
{
  name = 'invoiceLogDetailElements1646968787532'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice_log_detail_elements" ("element_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, CONSTRAINT "PK_bbf8a81594408962bf24eb3c800" PRIMARY KEY ("element_id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invoice_log_detail_elements"`)
  }
}
