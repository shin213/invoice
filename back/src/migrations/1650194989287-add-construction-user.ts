import { MigrationInterface, QueryRunner } from 'typeorm'

export class addConstructionUser1650194989287 implements MigrationInterface {
  name = 'addConstructionUser1650194989287'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "construction_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "construction_id" integer NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_c387e5af0c71b293c38390bce9a" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "construction_user" ADD CONSTRAINT "FK_09d003e1d12e876803e2f7435fa" FOREIGN KEY ("construction_id") REFERENCES "constructions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "construction_user" ADD CONSTRAINT "FK_4a1855117520fced545e6963542" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "construction_user" DROP CONSTRAINT "FK_4a1855117520fced545e6963542"`,
    )
    await queryRunner.query(
      `ALTER TABLE "construction_user" DROP CONSTRAINT "FK_09d003e1d12e876803e2f7435fa"`,
    )
    await queryRunner.query(`DROP TABLE "construction_user"`)
  }
}
