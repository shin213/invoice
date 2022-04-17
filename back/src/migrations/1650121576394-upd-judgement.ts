import { MigrationInterface, QueryRunner } from 'typeorm'

export class updJudgement1650121576394 implements MigrationInterface {
  name = 'updJudgement1650121576394'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_6e7c424f462643d434aaa13deef"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "file_path_name"`,
    )
    await queryRunner.query(
      `ALTER TYPE "public"."judgements_type_enum" RENAME TO "judgements_type_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."judgements_type_enum" AS ENUM('approve', 'decline', 'reapply')`,
    )
    await queryRunner.query(
      `ALTER TABLE "judgements" ALTER COLUMN "type" TYPE "public"."judgements_type_enum" USING "type"::"text"::"public"."judgements_type_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."judgements_type_enum_old"`)
    await queryRunner.query(
      `CREATE INDEX "IDX_607af1b46bae811bab47eb7c60" ON "judgements" ("created_at") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_607af1b46bae811bab47eb7c60"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."judgements_type_enum_old" AS ENUM('approve', 'decline')`,
    )
    await queryRunner.query(
      `ALTER TABLE "judgements" ALTER COLUMN "type" TYPE "public"."judgements_type_enum_old" USING "type"::"text"::"public"."judgements_type_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."judgements_type_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."judgements_type_enum_old" RENAME TO "judgements_type_enum"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "file_path_name" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_6e7c424f462643d434aaa13deef" FOREIGN KEY ("file_path_name") REFERENCES "invoice_files"("path_name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
