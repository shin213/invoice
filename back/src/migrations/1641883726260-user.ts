import { MigrationInterface, QueryRunner } from 'typeorm'

export class user1641883726260 implements MigrationInterface {
  name = 'user1641883726260'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(256) NOT NULL, "name" character varying(256) NOT NULL, "is_admin" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_id" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`,
    )
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
