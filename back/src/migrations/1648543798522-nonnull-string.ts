import { MigrationInterface, QueryRunner } from 'typeorm'

export class nonnullString1648543798522 implements MigrationInterface {
  name = 'nonnullString1648543798522'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "invoice_formats" DROP COLUMN "name"`)
    await queryRunner.query(
      `ALTER TABLE "invoice_formats" ADD "name" character varying(256) NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "constructions" DROP COLUMN "code"`)
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD "code" character varying(256) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "employee_code" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "employee_code" SET DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "partner_companies" ALTER COLUMN "code" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "partner_companies" ALTER COLUMN "code" SET DEFAULT ''`,
    )
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "name"`)
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "name" character varying(256) NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "phone_number" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "phone_number" SET DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "postal_code" SET NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "city"`)
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "city" character varying(256) NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" DROP COLUMN "rest_address"`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "rest_address" character varying NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "family_name" SET DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "given_name" SET DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "family_name_furigana" SET DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "given_name_furigana" SET DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "employee_code" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "employee_code" SET DEFAULT ''`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "employee_code" DROP DEFAULT`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "employee_code" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "given_name_furigana" DROP DEFAULT`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "family_name_furigana" DROP DEFAULT`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "given_name" DROP DEFAULT`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ALTER COLUMN "family_name" DROP DEFAULT`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" DROP COLUMN "rest_address"`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "rest_address" character varying(256)`,
    )
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "city"`)
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "city" character varying(50)`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "postal_code" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "phone_number" DROP DEFAULT`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "phone_number" DROP NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "name"`)
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "name" character varying(50) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "partner_companies" ALTER COLUMN "code" DROP DEFAULT`,
    )
    await queryRunner.query(
      `ALTER TABLE "partner_companies" ALTER COLUMN "code" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "employee_code" DROP DEFAULT`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "employee_code" DROP NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "constructions" DROP COLUMN "code"`)
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD "code" character varying`,
    )
    await queryRunner.query(`ALTER TABLE "invoice_formats" DROP COLUMN "name"`)
    await queryRunner.query(
      `ALTER TABLE "invoice_formats" ADD "name" character varying(100) NOT NULL`,
    )
  }
}
