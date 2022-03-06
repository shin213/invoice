import { MigrationInterface, QueryRunner } from 'typeorm'

export class construction1644322128307 implements MigrationInterface {
  name = 'construction1644322128307'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "constructions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_id" integer NOT NULL, CONSTRAINT "PK_6f9140ade15430dea23f3d84a2f" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "billing_date" TIMESTAMP`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "due_date_for_payment" TIMESTAMP`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "payment_amount" integer`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "construction_id" integer`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TYPE "public"."invoices_status_enum" RENAME TO "invoices_status_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."invoices_status_enum" AS ENUM('not_requested', 'requested', 'rejected', 'completely_approved')`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "status" TYPE "public"."invoices_status_enum" USING "status"::"text"::"public"."invoices_status_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."invoices_status_enum_old"`)
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD CONSTRAINT "FK_341e814c391cfe96a82ae8c49c4" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_cd06382330d97d88233e750660d" FOREIGN KEY ("construction_id") REFERENCES "constructions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_cd06382330d97d88233e750660d"`,
    )
    await queryRunner.query(
      `ALTER TABLE "constructions" DROP CONSTRAINT "FK_341e814c391cfe96a82ae8c49c4"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."invoices_status_enum_old" AS ENUM('not_requested', 'requested', 'completely_approved')`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "status" TYPE "public"."invoices_status_enum_old" USING "status"::"text"::"public"."invoices_status_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."invoices_status_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."invoices_status_enum_old" RENAME TO "invoices_status_enum"`,
    )
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "construction_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "payment_amount"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "due_date_for_payment"`,
    )
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "billing_date"`)
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "updated_at"`)
    await queryRunner.query(`DROP TABLE "constructions"`)
  }
}
