import { MigrationInterface, QueryRunner } from 'typeorm'

export class constructionCode1645421235148 implements MigrationInterface {
  name = 'constructionCode1645421235148'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD "code" character varying`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "constructions" DROP COLUMN "code"`)
  }
}
