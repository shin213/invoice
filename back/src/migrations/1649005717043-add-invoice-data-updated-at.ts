import { MigrationInterface, QueryRunner } from 'typeorm'

export class addInvoiceDataUpdatedAt1649005717043
  implements MigrationInterface
{
  name = 'addInvoiceDataUpdatedAt1649005717043'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "updated_data_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "updated_data_at"`,
    )
  }
}
