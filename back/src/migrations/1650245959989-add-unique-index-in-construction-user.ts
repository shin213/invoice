import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUniqueIndexInConstructionUser1650245959989
  implements MigrationInterface
{
  name = 'addUniqueIndexInConstructionUser1650245959989'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b01a771372d8744b37012d7476" ON "construction_user" ("construction_id", "user_id") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b01a771372d8744b37012d7476"`,
    )
  }
}
