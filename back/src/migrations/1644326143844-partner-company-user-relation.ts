import { MigrationInterface, QueryRunner } from 'typeorm'

export class partnerCompanyUserRelation1644326143844
  implements MigrationInterface
{
  name = 'partnerCompanyUserRelation1644326143844'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "partner_company_id" integer`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_732cfc113e29388f2f67c8a63af" FOREIGN KEY ("partner_company_id") REFERENCES "partner_companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_732cfc113e29388f2f67c8a63af"`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "partner_company_id"`,
    )
  }
}
