import { MigrationInterface, QueryRunner } from 'typeorm'

export class updInvoiceStatus1649124618778 implements MigrationInterface {
  name = 'updInvoiceStatus1649124618778'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."invoices_status_enum" RENAME TO "invoices_status_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."invoices_status_enum" AS ENUM('inputting_with_system', 'declined_to_system', 'inputting_file', 'declined_to_file', 'awaiting_receipt', 'under_approval', 'completely_approved')`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "status" TYPE "public"."invoices_status_enum" USING "status"::"text"::"public"."invoices_status_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."invoices_status_enum_old"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."invoices_status_enum_old" AS ENUM('inputting_with_system', 'inputting_file', 'awaiting_receipt', 'under_approval', 'completely_approved')`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "status" TYPE "public"."invoices_status_enum_old" USING "status"::"text"::"public"."invoices_status_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."invoices_status_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."invoices_status_enum_old" RENAME TO "invoices_status_enum"`,
    )
  }
}
