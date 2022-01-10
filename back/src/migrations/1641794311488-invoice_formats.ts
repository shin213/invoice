import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceFormats1641794311488 implements MigrationInterface {
  name = 'invoiceFormats1641794311488'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice_formats" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "company_id" integer, CONSTRAINT "PK_5f7ea6f2b6b6042ef4cb7cc4263" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats" ADD CONSTRAINT "FK_01a1e8a0084ffda7c845a700ba3" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_formats" DROP CONSTRAINT "FK_01a1e8a0084ffda7c845a700ba3"`,
    )
    await queryRunner.query(`DROP TABLE "invoice_formats"`)
  }
}
