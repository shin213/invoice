import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceFile1649737789552 implements MigrationInterface {
  name = 'invoiceFile1649737789552'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice-files" ("filename" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "invoice_id" uuid NOT NULL, CONSTRAINT "PK_d5f83305b007e45da3a184095ec" PRIMARY KEY ("filename"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "file_filename" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice-files" ADD CONSTRAINT "FK_4e3da70c57afa011999ef87ca99" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_d1f6de44b87666e624633818820" FOREIGN KEY ("file_filename") REFERENCES "invoice-files"("filename") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_d1f6de44b87666e624633818820"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice-files" DROP CONSTRAINT "FK_4e3da70c57afa011999ef87ca99"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "file_filename"`,
    )
    await queryRunner.query(`DROP TABLE "invoice-files"`)
  }
}
