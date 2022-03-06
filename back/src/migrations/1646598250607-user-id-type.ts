import { MigrationInterface, QueryRunner } from 'typeorm'

export class userIdType1646598250607 implements MigrationInterface {
  name = 'userIdType1646598250607'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request_notifications" DROP CONSTRAINT "FK_bc6992e40cf6d96edf6e3edaddd"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_notifications" DROP COLUMN "user_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_notifications" ADD "user_id" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" DROP CONSTRAINT "FK_d6b1d38f8458370b23c8b9e3119"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" DROP COLUMN "receiver_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "request_receiver" ADD "receiver_id" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "judgements" DROP CONSTRAINT "FK_2169b2e65d5c70aadb3e291bd96"`,
    )
    await queryRunner.query(`ALTER TABLE "judgements" DROP COLUMN "user_id"`)
    await queryRunner.query(
      `ALTER TABLE "judgements" ADD "user_id" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_394fe48b64d0de79ad6159ed28c"`,
    )
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "requester_id"`)
    await queryRunner.query(
      `ALTER TABLE "requests" ADD "requester_id" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_7e369959f4952d563122ef12f11"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "created_by_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "created_by_id" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`,
    )
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user_id"`)
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "user_id" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "id" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`,
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
  }
}
