import { MigrationInterface, QueryRunner } from 'typeorm'

export class updUserId1648804895569 implements MigrationInterface {
  name = 'updUserId1648804895569'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" DROP COLUMN "confirmed"`,
    )
    await queryRunner.query(`ALTER TABLE "invoice_formats" DROP COLUMN "name"`)
    await queryRunner.query(
      `ALTER TABLE "invoice_formats" ADD "name" character varying(256) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_notifications" DROP CONSTRAINT "FK_bc6992e40cf6d96edf6e3edaddd"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_notifications" DROP COLUMN "user_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_notifications" ADD "user_id" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" DROP CONSTRAINT "FK_d6b1d38f8458370b23c8b9e3119"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" DROP COLUMN "receiver_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" ADD "receiver_id" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "judgements" DROP CONSTRAINT "FK_2169b2e65d5c70aadb3e291bd96"`,
    )
    await queryRunner.query(`ALTER TABLE "judgements" DROP COLUMN "user_id"`)
    await queryRunner.query(
      `ALTER TABLE "judgements" ADD "user_id" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_394fe48b64d0de79ad6159ed28c"`,
    )
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "requester_id"`)
    await queryRunner.query(
      `ALTER TABLE "requests" ADD "requester_id" uuid NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "constructions" DROP COLUMN "code"`)
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD "code" character varying(256) NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_7e369959f4952d563122ef12f11"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "created_by_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "created_by_id" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`,
    )
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user_id"`)
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "user_id" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`,
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
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "postal_code" SET DEFAULT ''`,
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
    await queryRunner.query(
      `CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `,
    )
    await queryRunner.query(
      `ALTER TABLE "request_notifications" ADD CONSTRAINT "FK_bc6992e40cf6d96edf6e3edaddd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" ADD CONSTRAINT "FK_d6b1d38f8458370b23c8b9e3119" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "judgements" ADD CONSTRAINT "FK_2169b2e65d5c70aadb3e291bd96" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_394fe48b64d0de79ad6159ed28c" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_7e369959f4952d563122ef12f11" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_7e369959f4952d563122ef12f11"`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_394fe48b64d0de79ad6159ed28c"`,
    )
    await queryRunner.query(
      `ALTER TABLE "judgements" DROP CONSTRAINT "FK_2169b2e65d5c70aadb3e291bd96"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" DROP CONSTRAINT "FK_d6b1d38f8458370b23c8b9e3119"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_notifications" DROP CONSTRAINT "FK_bc6992e40cf6d96edf6e3edaddd"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`,
    )
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
      `ALTER TABLE "companies" ALTER COLUMN "postal_code" DROP DEFAULT`,
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
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user_id"`)
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "user_id" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "created_by_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "created_by_id" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_7e369959f4952d563122ef12f11" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(`ALTER TABLE "constructions" DROP COLUMN "code"`)
    await queryRunner.query(
      `ALTER TABLE "constructions" ADD "code" character varying`,
    )
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "requester_id"`)
    await queryRunner.query(
      `ALTER TABLE "requests" ADD "requester_id" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_394fe48b64d0de79ad6159ed28c" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(`ALTER TABLE "judgements" DROP COLUMN "user_id"`)
    await queryRunner.query(
      `ALTER TABLE "judgements" ADD "user_id" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "judgements" ADD CONSTRAINT "FK_2169b2e65d5c70aadb3e291bd96" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" DROP COLUMN "receiver_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" ADD "receiver_id" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" ADD CONSTRAINT "FK_d6b1d38f8458370b23c8b9e3119" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_notifications" DROP COLUMN "user_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_notifications" ADD "user_id" integer NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_notifications" ADD CONSTRAINT "FK_bc6992e40cf6d96edf6e3edaddd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(`ALTER TABLE "invoice_formats" DROP COLUMN "name"`)
    await queryRunner.query(
      `ALTER TABLE "invoice_formats" ADD "name" character varying(100) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ADD "confirmed" boolean NOT NULL`,
    )
  }
}
