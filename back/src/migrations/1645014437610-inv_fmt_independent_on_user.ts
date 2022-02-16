import { MigrationInterface, QueryRunner } from 'typeorm'

export class invFmtIndependentOnUser1645014437610
  implements MigrationInterface
{
  name = 'invFmtIndependentOnUser1645014437610'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" DROP CONSTRAINT "FK_f797936cfe6e21f9a342e6d95a9"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" DROP COLUMN "created_by"`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" ADD "created_by" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_formats_log" ADD CONSTRAINT "FK_f797936cfe6e21f9a342e6d95a9" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
