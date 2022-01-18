import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceForamtLogs1642494041588 implements MigrationInterface {
  name = 'invoiceForamtLogs1642494041588'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice_formats_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoice_format_id" uuid NOT NULL, "created_by" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "body" jsonb NOT NULL, CONSTRAINT "PK_6d20d617a087002881fe946a5c5" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" ADD CONSTRAINT "FK_7677af7bea4df18ed56d159a3bb" FOREIGN KEY ("invoice_format_id") REFERENCES "invoice_formats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" ADD CONSTRAINT "FK_f797936cfe6e21f9a342e6d95a9" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" DROP CONSTRAINT "FK_f797936cfe6e21f9a342e6d95a9"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" DROP CONSTRAINT "FK_7677af7bea4df18ed56d159a3bb"`,
    )
    await queryRunner.query(`DROP TABLE "invoice_formats_log"`)
  }
}
