import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceLog1644311231556 implements MigrationInterface {
  name = 'invoiceLog1644311231556'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoice_format_log_id" uuid NOT NULL, "body" jsonb NOT NULL, CONSTRAINT "PK_1be79907ba240e3a3df70682dc8" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_log" ADD CONSTRAINT "FK_e173b6b912312c4702d25d4a803" FOREIGN KEY ("invoice_format_log_id") REFERENCES "invoice_formats_log"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_log" DROP CONSTRAINT "FK_e173b6b912312c4702d25d4a803"`,
    )
    await queryRunner.query(`DROP TABLE "invoice_log"`)
  }
}
