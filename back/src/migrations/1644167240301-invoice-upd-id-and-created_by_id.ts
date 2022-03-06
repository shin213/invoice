import { MigrationInterface, QueryRunner } from 'typeorm'

export class invoiceUpdIdAndCreatedById1644167240301
  implements MigrationInterface
{
  name = 'invoiceUpdIdAndCreatedById1644167240301'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_26daf5e433d6fb88ee32ce93637"`,
    )
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "user_id"`)
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "created_by_id" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_185e1184286ce9ddfb6e62db1d3"`,
    )
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "invoice_id"`)
    await queryRunner.query(
      `ALTER TABLE "requests" ADD "invoice_id" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_5205adc87f5b6dedd3be2687eba"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce"`,
    )
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "invoice_id"`)
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "invoice_id" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_185e1184286ce9ddfb6e62db1d3" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_7e369959f4952d563122ef12f11" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_5205adc87f5b6dedd3be2687eba" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_5205adc87f5b6dedd3be2687eba"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_7e369959f4952d563122ef12f11"`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_185e1184286ce9ddfb6e62db1d3"`,
    )
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "invoice_id"`)
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "invoice_id" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce"`,
    )
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "invoices" ADD "id" SERIAL NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_5205adc87f5b6dedd3be2687eba" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "invoice_id"`)
    await queryRunner.query(
      `ALTER TABLE "requests" ADD "invoice_id" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_185e1184286ce9ddfb6e62db1d3" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "created_by_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "user_id" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_26daf5e433d6fb88ee32ce93637" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
