import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceLogDetailElements1647148382771
  implements MigrationInterface
{
  name = 'invoiceLogDetailElements1647148382771'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_log" ADD "detail" jsonb NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "invoice_log" DROP COLUMN "detail"`)
  }
}
