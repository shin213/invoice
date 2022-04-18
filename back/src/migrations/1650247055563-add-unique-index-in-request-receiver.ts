import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUniqueIndexInRequestReceiver1650247055563
  implements MigrationInterface
{
  name = 'addUniqueIndexInRequestReceiver1650247055563'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3351501afb925437c66ac8841d" ON "request_receiver" ("request_id", "receiver_id") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3351501afb925437c66ac8841d"`,
    )
  }
}
