import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceFile1649740946199 implements MigrationInterface {
  name = 'invoiceFile1649740946199'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice_files" ("path_name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "invoice_id" uuid NOT NULL, "created_by_id" uuid, CONSTRAINT "PK_a515fc480d3dff78498bca91360" PRIMARY KEY ("path_name"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "file_path_name" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_files" ADD CONSTRAINT "FK_5a04d7a5119fb2bdd3ecbddc30e" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_files" ADD CONSTRAINT "FK_c84de3a1a32b0aefb6462a35243" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_6e7c424f462643d434aaa13deef" FOREIGN KEY ("file_path_name") REFERENCES "invoice_files"("path_name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_6e7c424f462643d434aaa13deef"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_files" DROP CONSTRAINT "FK_c84de3a1a32b0aefb6462a35243"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_files" DROP CONSTRAINT "FK_5a04d7a5119fb2bdd3ecbddc30e"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "file_path_name"`,
    )
    await queryRunner.query(`DROP TABLE "invoice_files"`)
  }
}
