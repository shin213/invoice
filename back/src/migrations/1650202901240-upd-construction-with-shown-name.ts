import { MigrationInterface, QueryRunner } from 'typeorm'

export class updConstructionWithShownName1650202901240
  implements MigrationInterface
{
  name = 'updConstructionWithShownName1650202901240'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."constructions_shown_name_enum" AS ENUM('name', 'code', 'custom')`,
    )
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD "shown_name" "public"."constructions_shown_name_enum" NOT NULL DEFAULT 'name'`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "constructions"."shown_name" IS '協力企業に工事名を表示するか工事コード、カスタム表示名を表示するか'`,
    )
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD "custom_shown_name" character varying(256) NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "constructions"."custom_shown_name" IS 'カスタム表示名'`,
    )
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD "remarks" text NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "constructions"."remarks" IS '備考'`,
    )
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "constructions" DROP COLUMN "updated_at"`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "constructions"."remarks" IS '備考'`,
    )
    await queryRunner.query(`ALTER TABLE "constructions" DROP COLUMN "remarks"`)
    await queryRunner.query(
      `COMMENT ON COLUMN "constructions"."custom_shown_name" IS 'カスタム表示名'`,
    )
    await queryRunner.query(
      `ALTER TABLE "constructions" DROP COLUMN "custom_shown_name"`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "constructions"."shown_name" IS '協力企業に工事名を表示するか工事コード、カスタム表示名を表示するか'`,
    )
    await queryRunner.query(
      `ALTER TABLE "constructions" DROP COLUMN "shown_name"`,
    )
    await queryRunner.query(
      `DROP TYPE "public"."constructions_shown_name_enum"`,
    )
  }
}
