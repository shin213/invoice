import { MigrationInterface, QueryRunner } from 'typeorm'

export class addCreatedAt1645060407545 implements MigrationInterface {
  name = 'addCreatedAt1645060407545'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_log" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_log" DROP COLUMN "created_at"`,
    )
  }
}
