import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceFormatDetailElements1646959209407
  implements MigrationInterface
{
  name = 'invoiceFormatDetailElements1646959209407'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."invoice_format_detail_elements_value_type_enum" AS ENUM('string', 'number', 'date')`,
    )
    await queryRunner.query(
      `CREATE TABLE "invoice_format_detail_elements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" integer NOT NULL, "label" character varying NOT NULL, "value_type" "public"."invoice_format_detail_elements_value_type_enum" NOT NULL DEFAULT 'string', "own" boolean NOT NULL, "invoice_format_log_id" uuid NOT NULL, CONSTRAINT "PK_09dc71de6b071aabdb3e73e3324" PRIMARY KEY ("id")); COMMENT ON COLUMN "invoice_format_detail_elements"."own" IS '\`true\`: ゼネコンが入力。, \`false\`: 下請けが入力。'`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoice_format_detail_elements" ADD CONSTRAINT "FK_9d3889b5ce7f973231fb1ba2a53" FOREIGN KEY ("invoice_format_log_id") REFERENCES "invoice_formats_log"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_format_detail_elements" DROP CONSTRAINT "FK_9d3889b5ce7f973231fb1ba2a53"`,
    )
    await queryRunner.query(`DROP TABLE "invoice_format_detail_elements"`)
    await queryRunner.query(
      `DROP TYPE "public"."invoice_format_detail_elements_value_type_enum"`,
    )
  }
}
