import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceFile1649738677880 implements MigrationInterface {
  name = 'invoiceFile1649738677880'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice-files" ("path_name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "invoice_id" uuid NOT NULL, CONSTRAINT "PK_07e7ad8306d2346bc08c46365d0" PRIMARY KEY ("path_name"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "file_path_name" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice-files" ADD CONSTRAINT "FK_4e3da70c57afa011999ef87ca99" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_6e7c424f462643d434aaa13deef" FOREIGN KEY ("file_path_name") REFERENCES "invoice-files"("path_name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_6e7c424f462643d434aaa13deef"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice-files" DROP CONSTRAINT "FK_4e3da70c57afa011999ef87ca99"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "file_path_name"`,
    )
    await queryRunner.query(`DROP TABLE "invoice-files"`)
  }
}
