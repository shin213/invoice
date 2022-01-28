import { MigrationInterface, QueryRunner } from 'typeorm'

export class userAddColumns1643194777521 implements MigrationInterface {
  name = 'userAddColumns1643194777521'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "family_name" character varying(256) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD "given_name" character varying(256) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD "family_name_furigana" character varying(256) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD "given_name_furigana" character varying(256) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD "employee_code" character varying`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "employee_code"`)
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "given_name_furigana"`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "family_name_furigana"`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "given_name"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "family_name"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying(256) NOT NULL`,
    )
  }
}
