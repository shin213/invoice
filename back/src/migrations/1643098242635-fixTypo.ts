import { MigrationInterface, QueryRunner } from 'typeorm'

export class fixTypo1643098242635 implements MigrationInterface {
  name = 'fixTypo1643098242635'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "judgements" DROP CONSTRAINT "FK_2db810dcb5c201e3aea9ed762dd"`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_185e1184286ce9ddfb6e62db1d3"`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_845adcd2065e4b2b8c726299cf8"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."invoices_status_enum" AS ENUM('not_requested', 'requested', 'completely_approved')`,
    )
    await queryRunner.query(
      `CREATE TABLE "invoices" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" "public"."invoices_status_enum" NOT NULL, "company_id" integer, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "invoice_id" integer, "user_id" integer, "request_id" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "judgements" ADD CONSTRAINT "FK_2db810dcb5c201e3aea9ed762dd" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_185e1184286ce9ddfb6e62db1d3" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_845adcd2065e4b2b8c726299cf8" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_42385e42f092f26bd38df549717" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_5205adc87f5b6dedd3be2687eba" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_1de549e1e015a53856120e1398f" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_1de549e1e015a53856120e1398f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_5205adc87f5b6dedd3be2687eba"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_42385e42f092f26bd38df549717"`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_845adcd2065e4b2b8c726299cf8"`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_185e1184286ce9ddfb6e62db1d3"`,
    )
    await queryRunner.query(
      `ALTER TABLE "judgements" DROP CONSTRAINT "FK_2db810dcb5c201e3aea9ed762dd"`,
    )
    await queryRunner.query(`DROP TABLE "comments"`)
    await queryRunner.query(`DROP TABLE "invoices"`)
    await queryRunner.query(`DROP TYPE "public"."invoices_status_enum"`)
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_845adcd2065e4b2b8c726299cf8" FOREIGN KEY ("comment_id") REFERENCES "commets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_185e1184286ce9ddfb6e62db1d3" FOREIGN KEY ("invoice_id") REFERENCES "inovices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "judgements" ADD CONSTRAINT "FK_2db810dcb5c201e3aea9ed762dd" FOREIGN KEY ("comment_id") REFERENCES "commets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
