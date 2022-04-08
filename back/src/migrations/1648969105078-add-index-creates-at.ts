import { MigrationInterface, QueryRunner } from 'typeorm'

export class addIndexCreatesAt1648969105078 implements MigrationInterface {
  name = 'addIndexCreatesAt1648969105078'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_897f30afd878cf52ad26b13b30" ON "requests" ("created_at") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_897f30afd878cf52ad26b13b30"`,
    )
  }
}
