import { MigrationInterface, QueryRunner } from 'typeorm'

export class unconfirmedUser1648473324972 implements MigrationInterface {
  name = 'unconfirmedUser1648473324972'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "unconfirmed_users" ("email" character varying NOT NULL, "confirmed" boolean NOT NULL, "family_name" character varying(256) NOT NULL, "given_name" character varying(256) NOT NULL, "family_name_furigana" character varying(256) NOT NULL, "given_name_furigana" character varying(256) NOT NULL, "is_admin" boolean NOT NULL, "employee_code" character varying, "company_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_44df95be65f46ed8101bf123734" PRIMARY KEY ("email"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" ADD CONSTRAINT "FK_d3736a1e9dabf05cb7482fcb74d" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "unconfirmed_users" DROP CONSTRAINT "FK_d3736a1e9dabf05cb7482fcb74d"`,
    )
    await queryRunner.query(`DROP TABLE "unconfirmed_users"`)
  }
}
