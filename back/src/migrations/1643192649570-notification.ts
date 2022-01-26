import {MigrationInterface, QueryRunner} from "typeorm";

export class notification1643192649570 implements MigrationInterface {
    name = 'notification1643192649570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."request_notifications_is_read_enum" AS ENUM('read', 'unread')`);
        await queryRunner.query(`CREATE TYPE "public"."request_notifications_type_enum" AS ENUM('request_coming', 'request_accepted', 'request_declined')`);
        await queryRunner.query(`CREATE TABLE "request_notifications" ("id" SERIAL NOT NULL, "is_read" "public"."request_notifications_is_read_enum" NOT NULL, "type" "public"."request_notifications_type_enum" NOT NULL, "user_id" integer, "request_receiver_id" integer, CONSTRAINT "PK_f88cac4f2ecd100043e8bfc4ee8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request_receiver" ("id" SERIAL NOT NULL, "request_id" integer, "receiver_id" integer, CONSTRAINT "PK_eaf97ef4b8eac5e7caf9194446e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "judgements" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "comment_id" integer, "request_id" integer, CONSTRAINT "PK_7ba5a452e0f781f85794caac188" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."requests_status_enum" AS ENUM('requesting', 'approved', 'declined', 'others_approved', 'others_declined')`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" SERIAL NOT NULL, "status" "public"."requests_status_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "requester_id" integer, "invoice_id" integer, "company_id" integer, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."invoices_status_enum" AS ENUM('not_requested', 'requested', 'completely_approved')`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" "public"."invoices_status_enum" NOT NULL, "user_id" integer, "company_id" integer, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "invoice_id" integer, "user_id" integer, "request_id" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "company_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "request_notifications" ADD CONSTRAINT "FK_bc6992e40cf6d96edf6e3edaddd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request_notifications" ADD CONSTRAINT "FK_def337c7088424cc4d98352b73d" FOREIGN KEY ("request_receiver_id") REFERENCES "request_receiver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request_receiver" ADD CONSTRAINT "FK_7433191d9676a2ab307970fa13e" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request_receiver" ADD CONSTRAINT "FK_d6b1d38f8458370b23c8b9e3119" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "judgements" ADD CONSTRAINT "FK_2169b2e65d5c70aadb3e291bd96" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "judgements" ADD CONSTRAINT "FK_2db810dcb5c201e3aea9ed762dd" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "judgements" ADD CONSTRAINT "FK_bc6b0e4993ea6755325256f5d6c" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_394fe48b64d0de79ad6159ed28c" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_185e1184286ce9ddfb6e62db1d3" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_7ce411acb524c11f03fa38de9de" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_26daf5e433d6fb88ee32ce93637" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_42385e42f092f26bd38df549717" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_5205adc87f5b6dedd3be2687eba" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1de549e1e015a53856120e1398f" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1de549e1e015a53856120e1398f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_5205adc87f5b6dedd3be2687eba"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_42385e42f092f26bd38df549717"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_26daf5e433d6fb88ee32ce93637"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_7ce411acb524c11f03fa38de9de"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_185e1184286ce9ddfb6e62db1d3"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_394fe48b64d0de79ad6159ed28c"`);
        await queryRunner.query(`ALTER TABLE "judgements" DROP CONSTRAINT "FK_bc6b0e4993ea6755325256f5d6c"`);
        await queryRunner.query(`ALTER TABLE "judgements" DROP CONSTRAINT "FK_2db810dcb5c201e3aea9ed762dd"`);
        await queryRunner.query(`ALTER TABLE "judgements" DROP CONSTRAINT "FK_2169b2e65d5c70aadb3e291bd96"`);
        await queryRunner.query(`ALTER TABLE "request_receiver" DROP CONSTRAINT "FK_d6b1d38f8458370b23c8b9e3119"`);
        await queryRunner.query(`ALTER TABLE "request_receiver" DROP CONSTRAINT "FK_7433191d9676a2ab307970fa13e"`);
        await queryRunner.query(`ALTER TABLE "request_notifications" DROP CONSTRAINT "FK_def337c7088424cc4d98352b73d"`);
        await queryRunner.query(`ALTER TABLE "request_notifications" DROP CONSTRAINT "FK_bc6992e40cf6d96edf6e3edaddd"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "company_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TYPE "public"."invoices_status_enum"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TYPE "public"."requests_status_enum"`);
        await queryRunner.query(`DROP TABLE "judgements"`);
        await queryRunner.query(`DROP TABLE "request_receiver"`);
        await queryRunner.query(`DROP TABLE "request_notifications"`);
        await queryRunner.query(`DROP TYPE "public"."request_notifications_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."request_notifications_is_read_enum"`);
    }

}
