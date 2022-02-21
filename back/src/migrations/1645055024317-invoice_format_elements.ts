import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceFormatElements1645055024317 implements MigrationInterface {
  name = 'invoiceFormatElements1645055024317'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice_format_elements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" integer NOT NULL, "label" character varying NOT NULL, "own" boolean NOT NULL, "invoice_format_log_id" uuid NOT NULL, CONSTRAINT "PK_587ab8a060c07b526a9030e1010" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" DROP COLUMN "body"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_format_elements" ADD CONSTRAINT "FK_93a3303784d12ce61b1710fc273" FOREIGN KEY ("invoice_format_log_id") REFERENCES "invoice_formats_log"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_format_elements" DROP CONSTRAINT "FK_93a3303784d12ce61b1710fc273"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" ADD "body" jsonb NOT NULL`,
    )
    await queryRunner.query(`DROP TABLE "invoice_format_elements"`)
  }
}
