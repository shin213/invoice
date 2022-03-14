import { MigrationInterface, QueryRunner } from 'typeorm'

export class constructionName1646586927643 implements MigrationInterface {
  name = 'constructionName1646586927643'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD "name" character varying NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "constructions" DROP COLUMN "name"`)
  }
}
