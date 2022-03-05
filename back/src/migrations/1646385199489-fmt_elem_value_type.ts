import { MigrationInterface, QueryRunner } from 'typeorm'

export class fmtElemValueType1646385199489 implements MigrationInterface {
  name = 'fmtElemValueType1646385199489'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."invoice_format_elements_value_type_enum" AS ENUM('string', 'number', 'date')`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_format_elements" ADD "value_type" "public"."invoice_format_elements_value_type_enum" NOT NULL DEFAULT 'string'`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "invoice_format_elements"."own" IS '\`true\`: ゼネコンが入力。, \`false\`: 下請けが入力。'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "invoice_format_elements"."own" IS NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_format_elements" DROP COLUMN "value_type"`,
    )
    await queryRunner.query(
      `DROP TYPE "public"."invoice_format_elements_value_type_enum"`,
    )
  }
}
